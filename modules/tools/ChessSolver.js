const ProcessBuilder = Java.type("java.lang.ProcessBuilder");

export function getChessSolution(fenString, callback) {
    const serverPath = new java.io.File("./config/ChatTriggers/modules/tools/chess-solver/main-chess.js").getAbsolutePath();

    if (!new java.io.File(serverPath).exists()) {
        ChatLib.chat("[ChessSolver] ⚠ Solver script not found.");
        return;
    }

    new java.lang.Thread(new java.lang.Runnable({
        run: function () {
            try {
                let processBuilder = new ProcessBuilder("node", serverPath, fenString);
                processBuilder.redirectErrorStream(true);

                let process = processBuilder.start();
                let reader = new java.io.BufferedReader(new java.io.InputStreamReader(process.getInputStream()));

                let output = "";
                let line;
                while ((line = reader.readLine()) !== null) {
                    output += line + "\n";
                }
                reader.close();
                process.waitFor();

                callback(output.trim());
            } catch (err) {
                ChatLib.chat("[ChessSolver] Error: " + err);
                callback("null");
            }
        }
    })).start();
}
