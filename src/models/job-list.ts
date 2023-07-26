export type JobListView = {
  relations: JobNameRelation[];
}

export type JobOptionsListView = {
  ukJobs: JobItem[];
  brJobs: JobItem[];
}

export type JobNameRelation ={
  ukJob: JobItem;
  brJob: JobItem;
  rowKey?: string;
}

export type JobItem = {
  jobName: string;
  jobId: string;
  jobProjectName: string;
  jobProjectId: string;
}