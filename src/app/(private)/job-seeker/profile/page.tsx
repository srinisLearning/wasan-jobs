'use client'
import PageTitle from '@/components/functional/page-title'
import useUsersStore, { IUsersStore } from '@/store/users-store'
import { Mail, User, Briefcase, Calendar, FileText } from 'lucide-react'

function JobSeekerProfilePage() {
  const { user } = useUsersStore() as IUsersStore

  if (!user) {
    return (
      <div>
        <PageTitle title="Profile" />
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

  const InfoField = ({ label, value }: { label: string; value: string | number }) => (
    <div>
      <label className="text-sm font-medium text-gray-500">{label}</label>
      <p className="text-gray-900 mt-1">{value}</p>
    </div>
  )

  const SectionCard = ({ 
    icon: Icon, 
    title, 
    children, 
    className = '' 
  }: { 
    icon: any; 
    title: string; 
    children: React.ReactNode; 
    className?: string 
  }) => (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Icon className="w-5 h-5" />
        {title}
      </h3>
      {children}
    </div>
  )

  return (
    <div>
      <PageTitle title="My Profile" />

      <div className="mt-6">
        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
          <div className="flex items-start gap-6">
            <div className="shrink-0">
              {user.profile_pic ? (
                <img
                  src={user.profile_pic}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-3xl font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Job Seeker
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        {user.bio && (
          <SectionCard icon={FileText} title="About Me" className="mb-6">
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          </SectionCard>
        )}

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <SectionCard icon={User} title="Personal Information">
            <div className="space-y-3">
              <InfoField label="Full Name" value={user.name} />
              <InfoField label="Email Address" value={user.email} />
              <InfoField label="Role" value={user.role.replace('-', ' ')} />
            </div>
          </SectionCard>

          <SectionCard icon={Calendar} title="Account Information">
            <div className="space-y-3">
              <InfoField label="Member Since" value={formatDate(user.created_at)} />
              <InfoField label="Last Updated" value={formatDate(user.created_at)} />
              <InfoField label="User ID" value={`#${user.id}`} />
            </div>
          </SectionCard>
        </div>

        {/* Resume Section */}
        {user.resume_url && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-semibold text-gray-900">Resume</h3>
              </div>
              <a
                href={user.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                View Resume
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Your resume is uploaded and ready to use for job applications.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobSeekerProfilePage