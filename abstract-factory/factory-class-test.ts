import { LoggerFactory } from "./factory-class";

const logger = LoggerFactory.createLogger();

logger.log("logging message");
logger.debug("debug message");
logger.error("error message");
logger.warn("warn message");