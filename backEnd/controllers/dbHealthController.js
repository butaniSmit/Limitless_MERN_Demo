const mongoose = require("mongoose");
const { exec } = require("child_process");

exports.checkDbHealth = async (req, res, next) => {
  try {
    // 1. Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({
        status: "error",
        message: "Database is not connected.",
        readyState: mongoose.connection.readyState,
      });
    }

    // 2. Ping the database
    const pingResult = await mongoose.connection.db.admin().ping();

    // 3. Get server status (connections, operations)
    const serverStatus = await mongoose.connection.db.admin().serverStatus();
    const activeConnections = serverStatus.connections ? serverStatus.connections.current : null;

    const responseData = {
      status: "success",
      timestamp: new Date().toISOString(),
      dbHealth: "OK",
      ping: pingResult,
      connections: {
        current: activeConnections,
        available: serverStatus.connections ? serverStatus.connections.available : null,
      },
    };

    // 4. If Atlas credentials are provided, check if we should auto-pause the cluster
    const { ATLAS_PUBLIC_KEY, ATLAS_PRIVATE_KEY, ATLAS_PROJECT_ID, ATLAS_CLUSTER_NAME } = process.env;

    const hasAtlasCreds = ATLAS_PUBLIC_KEY && ATLAS_PRIVATE_KEY && ATLAS_PROJECT_ID && ATLAS_CLUSTER_NAME;

    // Define connection threshold. Usually, the server itself holds 1-2 connections.
    // If current connections <= 2, it indicates only the backend check and system are active.
    const CONNECTION_THRESHOLD = 2;

    if (hasAtlasCreds && activeConnections !== null && activeConnections <= CONNECTION_THRESHOLD) {
      responseData.autoPauseTriggered = true;
      
      // Construct Atlas API endpoint URL
      const url = `https://cloud.mongodb.com/api/atlas/v1.0/groups/${ATLAS_PROJECT_ID}/clusters/${ATLAS_CLUSTER_NAME}`;
      
      // Construct curl command with Digest auth to pause cluster
      // We escape credentials and URL safely
      const cmd = `curl --digest -u "${ATLAS_PUBLIC_KEY}:${ATLAS_PRIVATE_KEY}" -X PATCH "${url}" -H "Content-Type: application/json" -d "{\\\"paused\\\": true}"`;

      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.error("Failed to pause Atlas cluster:", error);
          responseData.autoPauseError = error.message;
        } else {
          try {
            const result = JSON.parse(stdout);
            responseData.autoPauseResponse = result;
          } catch (e) {
            responseData.autoPauseResponse = stdout;
          }
        }
        return res.status(200).json(responseData);
      });
    } else {
      responseData.autoPauseTriggered = false;
      if (!hasAtlasCreds) {
        responseData.message = "Auto-pause skipped: MongoDB Atlas credentials are not configured in environment variables.";
      } else {
        responseData.message = `Auto-pause skipped: Active connections (${activeConnections}) exceed threshold (${CONNECTION_THRESHOLD}).`;
      }
      return res.status(200).json(responseData);
    }
  } catch (err) {
    next(err);
  }
};
