import { getJobById } from '@/server-actions/jobs' 
import PageTitle from '@/components/functional/page-title'
import InfoMessage from '@/components/ui/info-message'
import React from 'react'
import JobForm from '@/components/functional/jobs-form'

interface EditJobPageProps {
  params : Promise<{ id: string }>
}

async function EditJobPage({ params }: EditJobPageProps) {
  const {id}:any = await params
  const response = await getJobById(id)
  if(!response.success || !response.data) {
    return <InfoMessage message='Job not found' />
  }
  return (
    <div className='flex flex-col gap-5'>
        <PageTitle title='Edit Job' />

        <JobForm 
         formType='edit'
         initialValues={response.data}
        />
    </div>
  )
}

export default EditJobPage