import { JobItem, JobNameRelation, JobOptionsListView } from 'Models';
import { useState } from 'react';
import { FiEdit2, FiTrash } from 'react-icons/fi';
import { BsCheck2, BsXLg  } from 'react-icons/bs';
import { JobDropdown } from 'Components';
import { deleteRelation, updateRelation } from 'Services';
import { Spinner } from 'Utils';

type props = {
  relation: JobNameRelation,
  jobOptions: JobOptionsListView,
  onChange?: () => {};
}

export function RelationRow({relation, jobOptions, onChange}:props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [brJob, setBrJob] = useState<JobItem | undefined>(relation.brJob);
  const [ukJob, setUkJob] = useState<JobItem | undefined>(relation.ukJob);

  const content = () => {
    return (
      <>
        <td>{relation.brJob.jobProjectName ?? '-'}</td>
        <td>{relation.brJob.jobName ?? '-'}</td>
        <td>{relation.ukJob.jobProjectName ?? '-'}</td>
        <td>{relation.ukJob.jobName ?? '-'}</td>
      </>
    )
  }

  const editingContent = () => {
    return (
      <>
        <td>{brJob?.jobProjectName ?? '-'}</td>
        <td>
          <JobDropdown options={jobOptions.brJobs} selectedJob={brJob} onSelect={setBrJob}/>
        </td>
        <td>{ukJob?.jobProjectName ?? '-'}</td>
        <td>
          <JobDropdown options={jobOptions.ukJobs} selectedJob={ukJob} onSelect={setUkJob}/>
        </td>
      </>
    )
  }

  const onDeleteRelation = async (rowKey: string) => {
    if (isLoading) return;

    setIsLoading(true);

    await deleteRelation(rowKey);

    if (onChange) onChange();
    setIsLoading(false);
  }

  const onUpdateRelation = async (updatedRelation: JobNameRelation) => {
    if (isLoading) return;

    setIsLoading(true);

    await updateRelation(updatedRelation);

    if (onChange) onChange();
    setIsEditing(false);
    setIsLoading(false);
  }

  return (
    <>
      <tr className='h-12'>
        {
          isEditing
          ? editingContent()
          : content()
        }
        <td className='relative'>
          {
            isEditing 
            ? (
              <span className='flex justify-around m-auto'>
                <button disabled={isLoading} onClick={() => setIsEditing(false)}>
                  <BsXLg className={`w-full ${isLoading ? 'text-red-400' : ''}`}/> 
                </button>
                <button disabled={isLoading} onClick={() => onUpdateRelation({ukJob: ukJob!, brJob: brJob!, rowKey: relation.rowKey})}>
                  <BsCheck2 className={`w-full ${isLoading ? 'text-red-400' : ''}`}/>
                </button>
              </span>
            )
            : (
              <span className='flex justify-around m-auto'>
                <button disabled={isLoading} onClick={() => setIsEditing(true)}>
                  <FiEdit2 className={`w-full ${isLoading ? 'text-red-400' : ''}`}/>
                </button>
                <button disabled={isLoading} onClick={() => onDeleteRelation(relation.rowKey!)}>
                  <FiTrash className={`w-full ${isLoading ? 'text-red-400' : ''}`}/>
                </button>
              </span>
            )
          }
          {
            isLoading 
            ? <Spinner className='absolute right-[-50px] top-[20%]'/>
            : <></>
          }
        </td>
      </tr>
    </>
  )
}