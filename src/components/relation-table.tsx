import { NewRelation, RelationRow } from "Components";
import { JobNameRelation, JobOptionsListView } from "Models";

type props = {
  relations: JobNameRelation[],
  className: string,
  jobOptions: JobOptionsListView,
  onChange: () => {};
}

export function RelationTable({relations, className, jobOptions, onChange}:props) {
  return (
    <div className={className}>
      <table className='mx-auto w-3/5 table-auto'>
        <thead>
          <tr>
            <th colSpan={2} className='px-4'>
              <span className='flex justify-center border-b-2 border-blue-400'>
                BR
              </span>
            </th>
            <th colSpan={2} className='px-4'>
              <span className='flex justify-center border-b-2 border-blue-400'>
                UK
              </span>
            </th>
            <th></th>
          </tr>
          <tr>
            <th className='px-2'>
              <span className='flex justify-center mx-4 border-b-2 border-green-400'>
                Project Name
              </span>
            </th>
            <th className='px-2'>
              <span className='flex justify-center mx-4 border-b-2 border-green-400'>
                Job Name
              </span>
            </th>
            <th className='px-2'>
              <span className='flex justify-center mx-4 border-b-2 border-green-400'>
                Project Name
              </span>
            </th>
            <th className='px-2'>
              <span className='flex justify-center mx-4 border-b-2 border-green-400'>
                Job Name
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            <NewRelation jobOptions={jobOptions} onAdd={onChange} />
          }
          {
            relations?.map(relation => <RelationRow relation={relation} jobOptions={jobOptions} key={relation.brJob.jobId + relation.ukJob.jobId} onChange={onChange} />)
          }
        </tbody>
      </table>
    </div>
  ); 
}