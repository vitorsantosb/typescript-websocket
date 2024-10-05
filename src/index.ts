import "./server";





async function init() {
    try {


    } catch (error) {
        console.error("Error during initialization", error);
        process.exit(1);
    }
}

init().catch(err => console.error(err));
