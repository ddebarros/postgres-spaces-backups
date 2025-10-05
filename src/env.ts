import { config } from "dotenv";
import { envsafe, str, bool } from "envsafe";

// Load environment variables from .env file
config({ quiet: true });

export const env = envsafe({
  DO_SPACES_ACCESS_KEY_ID: str({
    desc: "DigitalOcean Spaces access key ID",
  }),
  DO_SPACES_SECRET_ACCESS_KEY: str({
    desc: "DigitalOcean Spaces secret access key",
  }),
  DO_SPACES_BUCKET: str({
    desc: "DigitalOcean Spaces bucket name",
  }),
  DO_SPACES_ENDPOINT: str({
    desc: "DigitalOcean Spaces endpoint URL (e.g., https://nyc3.digitaloceanspaces.com)",
    default: "",
    allowEmpty: true,
  }),
  BACKUP_DATABASE_URL: str({
    desc: "The connection string of the database to backup.",
  }),
  POSTGRES_VERSION: str({
    desc: "PostgreSQL version to install in Docker container (e.g., 16, 15, 14)",
    default: "17",
  }),
  DO_SPACES_FORCE_PATH_STYLE: bool({
    desc: "Use path style for the endpoint instead of the default subdomain style",
    default: true,
    allowEmpty: true,
  }),
  BACKUP_FILE_PREFIX: str({
    desc: "Prefix to the file name",
    default: "backup",
  }),
  BUCKET_SUBFOLDER: str({
    desc: "A subfolder to place the backup files in",
    default: "",
    allowEmpty: true,
  }),
  // This is both time consuming and resource intensive so we leave it disabled by default
  SUPPORT_OBJECT_LOCK: bool({
    desc: "Enables support for buckets with object lock by providing an MD5 hash with the backup file",
    default: false,
  }),
  BACKUP_OPTIONS: str({
    desc: "Any valid pg_dump option.",
    default: "",
    allowEmpty: true,
  }),
});
