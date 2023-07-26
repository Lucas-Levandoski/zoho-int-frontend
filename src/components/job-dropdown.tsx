import { JobItem } from "Models"

type props = {
  options: JobItem[];
  selectedJob: JobItem | undefined;
  onSelect: (job: JobItem | undefined) => void;
}

export function JobDropdown ({options, selectedJob, onSelect}: props) {
  const onOptionSelected = (event: any) => {
    const value = event?.target?.value;

    if(value === 0) 
      return onSelect(undefined);
    
    onSelect(options[+event.target.value - 1]);
  } 

  const findJobId = (job: JobItem | undefined) => {
    if(!job)
      return 0;

    return options.findIndex(item => item.jobId === job.jobId) + 1;
  }

  return (
    <select value={selectedJob ? findJobId(selectedJob) : 0} className="rounded bg-black border-blue-300 border-solid border-2 p-2" onChange={onOptionSelected}>
      <option value={0}>-</option>
      {options.map((option, id) => <option key={option.jobId} value={id + 1}>{option.jobName}</option>)}
    </select>
  );
}