import { backup } from "./backup.js";

const main = async () => {
  try {
    await backup();
  } catch (error) {
    console.error("Error while running backup: ", error);
    process.exit(1);
  }
};

main();
