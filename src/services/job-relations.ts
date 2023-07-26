import Axios from 'axios';

import { envVars } from 'Utils';
import { JobListView, JobNameRelation } from 'Models';
import { toast } from 'react-toastify';

const axios = Axios.create({
  baseURL: `${envVars.timelogFaUrl}/jobname`,
  timeout: 5000
})

export async function getExistingRelations(): Promise<JobListView | void> {
  return await axios.get<JobListView>('/relations/list').then(result => result.data).catch(r => { toast.error('Failed trying to list existing relations')});
}

export async function updateRelation(relation: JobNameRelation): Promise<void> {
  const body = {
    brJobName: relation.brJob.jobName,
    brJobId: relation.brJob.jobId,
    brJobProjectId: relation.brJob.jobProjectId,
    brJobProjectName: relation.brJob.jobProjectName,
    ukJobName: relation.ukJob.jobName,
    ukJobId: relation.ukJob.jobId,
    ukJobProjectId: relation.ukJob.jobProjectId,
    ukJobProjectName: relation.ukJob.jobProjectName,
  }

  await axios.put(`/${relation.rowKey}`, body).then(r => toast.success(r.data)).catch(r => toast.error(r.response.data));

  return;
}

export async function deleteRelation(rowKey: string): Promise<void> {
  await axios.delete(`/${rowKey}`).then(r => toast.success(r.data)).catch(r => toast.error(r.response.data)); 

  return;
}

export async function createRelation(relation: JobNameRelation): Promise<void>{
  const body = {
    brJobName: relation.brJob.jobName,
    brJobId: relation.brJob.jobId,
    brJobProjectId: relation.brJob.jobProjectId,
    brJobProjectName: relation.brJob.jobProjectName,
    ukJobName: relation.ukJob.jobName,
    ukJobId: relation.ukJob.jobId,
    ukJobProjectId: relation.ukJob.jobProjectId,
    ukJobProjectName: relation.ukJob.jobProjectName,
  }

  await axios.post('', body).then(r => toast.success(r.data)).catch(r => toast.error(r.response.data));

  return;
}