
export const envVars = {
  get timelogFaUrl() {
    return process.env.NEXT_PUBLIC_TIMELOGS_FA_URL;
  },
}


// this method checks for the nodejs env variables, it doesn't work for next.js
function checkVariable(envVarName: string, defaultValue = undefined): string {
  const variable = process.env[envVarName];

  if(!variable && defaultValue === undefined)
    throw new Error(`${envVarName} missing from the environment variables list`);

  return variable ?? `${defaultValue}`;
}