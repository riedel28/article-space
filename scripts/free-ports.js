const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const ports = [3000, 8000];

async function killProcessOnPort(port) {
    try {
        // For macOS/Linux
        const { stdout } = await execPromise(`lsof -ti:${port}`);
        const pids = stdout.trim().split('\n').filter(Boolean);
        
        if (pids.length > 0) {
            console.log(`Found process(es) on port ${port}: ${pids.join(', ')}`);
            for (const pid of pids) {
                try {
                    await execPromise(`kill -9 ${pid}`);
                    console.log(`Killed process ${pid} on port ${port}`);
                } catch (error) {
                    console.log(`Failed to kill process ${pid}: ${error.message}`);
                }
            }
        } else {
            console.log(`No process found on port ${port}`);
        }
    } catch (error) {
        // If lsof returns no results, the port is free
        if (error.code === 1) {
            console.log(`Port ${port} is free`);
        } else {
            console.log(`Error checking port ${port}: ${error.message}`);
        }
    }
}

async function freePorts() {
    console.log('Checking and freeing ports...');
    for (const port of ports) {
        await killProcessOnPort(port);
    }
    console.log('Port check complete.\n');
}

freePorts().catch(console.error);

