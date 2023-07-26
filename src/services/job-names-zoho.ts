import Axios from "axios";

import { envVars } from "Utils";
import { JobItem, JobOptionsListView } from "Models";
import { toast } from "react-toastify";

const axios = Axios.create({
  baseURL: `${envVars.timelogFaUrl}/jobname-zoho`,
  timeout: 5000
})

axios.defaults.baseURL = `${envVars.timelogFaUrl}/jobname-zoho`;

export async function getBRJobNames(): Promise<JobItem[] | void> {
  return await axios.get<{jobs: JobItem[]}>('/list/br').then(result => result.data.jobs).catch(r => {toast.error('Request failed on loading BR Job Names Options')});
}

export async function getUKJobNames(): Promise<JobItem[] | void> {
  return await axios.get<{jobs: JobItem[]}>('/list/uk').then(result => result.data.jobs).catch(r => {toast.error('Request failed on loading UK Job Names Options')});
}

export async function populateMatchingJobNames(): Promise<void> {
  return await axios.post('/populate-matching-jobs').then(r => {toast.success('Matching jobs populated')}).catch(r => {toast.error('Error populating matching jobs')})
}