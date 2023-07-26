'use client';
import { useEffect, useState } from 'react';
import { VscRefresh } from 'react-icons/vsc'

import { JobNameRelation, JobOptionsListView } from 'Models';
import { getBRJobNames, getExistingRelations, getUKJobNames, populateMatchingJobNames } from 'Services';
import { Spinner } from 'Utils';
import { RelationTable } from 'Components';
import { ToastContainer, toast } from 'react-toastify';



export default function Index() {
  const [relations, setRelations] = useState<JobNameRelation[]>([]);
  const [jobOptions, setJobOptions] = useState<JobOptionsListView>({brJobs: [], ukJobs: []});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    firstLoad();   
  }, []);

  const firstLoad = async() => {
    await refreshRelations(false);
    await loadJobOptions();

    setIsLoading(false);
  }

  const loadJobOptions = async() => {
    const brJobs = await getBRJobNames();
    const ukJobs = await getUKJobNames();

    if(brJobs && ukJobs) 
      setJobOptions({ brJobs, ukJobs });
  }

  const refreshRelations = async(shouldSetLoading = true) => {
    if (shouldSetLoading) setIsLoading(true);
    const relationsResult = (await getExistingRelations())?.relations;
    if (shouldSetLoading) setIsLoading(false);

    if(!relationsResult) return;
    setRelations(relationsResult);
  }
  
  const onRefreshClick = () => {
    refreshRelations();
    loadJobOptions();
  }

  const onPopulateMatchingJobsClick = async () => {
    setIsLoading(true);
    await populateMatchingJobNames();
    await refreshRelations(false);
    setIsLoading(false);
  }

  return (
    <>
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      <div className='pt-14 flex flex-col text-center justify-center'>
        <h1 className='mx-auto text-4xl border-b-2 pb-4 mb-4 w-6/12'>
          Zoho Integration Config Web Page
        </h1>
        <div className='w-1/2 mx-auto flex justify-around my-4'>
          <button 
            className={`relative rounded border-x-2 px-4 shadow ${isLoading ? 'text-red-400 shadow-red-400' : 'shadow-blue-600'}`}
            disabled={isLoading} 
            onClick={() => onPopulateMatchingJobsClick()}>
            Populate Matching Job Names
          </button>
          <button 
            onClick={() => onRefreshClick()} 
            disabled={isLoading}>
              <VscRefresh
                size={30}
                className={`transition delay-150 duration-300 ease-in-out ${isLoading ? 'text-red-400 animate-spin' : 'text-blue-400'}`}
              />
          </button>
        </div>
        <Spinner className={`pt-10 ${isLoading ? '' : 'hidden'}`} />
        <RelationTable className={isLoading ? 'hidden' : ''} relations={relations} jobOptions={jobOptions} onChange={() => refreshRelations(false)}/>
      </div>
    </>
  )
}
