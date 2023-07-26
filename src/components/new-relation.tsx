import { JobDropdown } from 'Components';
import { JobItem, JobOptionsListView } from 'Models';
import { CiSaveUp2 } from 'react-icons/ci';
import { useState } from 'react';
import { createRelation } from 'Services';
import { Spinner, onChangeEvent } from "Utils";

type props = {
  onAdd?: () => {};
  jobOptions: JobOptionsListView,
}

export function NewRelation({onAdd, jobOptions = { ukJobs: [], brJobs: []}}: props) {
  const [brJob, setBrJob] = useState<JobItem | undefined>();
  const [ukJob, setUkJob] = useState<JobItem | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const onNewRelation = async() => {
    setIsLoading(true);
    
    if(brJob && ukJob)
      await createRelation({ brJob, ukJob });

    if (onAdd) onAdd();
    
    setIsLoading(false);
  }

  return(
    <tr className="text-green-400">
      <td>{brJob?.jobProjectName ?? '-'}</td>
      <td>
        <JobDropdown options={jobOptions.brJobs} selectedJob={brJob} onSelect={setBrJob}/>
      </td>
      <td>{ukJob?.jobProjectName ?? '-'}</td>
      <td>
        <JobDropdown options={jobOptions.ukJobs} selectedJob={ukJob} onSelect={setUkJob}/>
      </td>
      <td className='relative'>
        <span className='flex justify-around'>
          <button disabled={isLoading} onClick={() => onNewRelation()} className={`m-auto ${isLoading ? 'text-red-400' : 'cursor-pointer'} ${ukJob && brJob ? '' : 'hidden'}`}>
            <CiSaveUp2 size={30} /> 
          </button>
        </span>
        {
          isLoading 
          ? <Spinner className='absolute right-[-50px] top-[20%]'/>
          : <></>
        }
      </td>
    </tr>
  )
}