import React from 'react'

interface DashboardCardProps {
    title : string;
    value : number;
    icon : React.ReactNode;
    color : string;
    label : string;
}

function DashboardCard({ title, value, icon, color, label }: DashboardCardProps) {
  return (
    <div className={`border p-5 shadow-sm rounded flex justify-between items-center ${color}`}>
        <div className='flex flex-col gap-2'>
            <h3 className="text-sm font-semibold">{title}</h3>
            <div className='flex items-end gap-1'>
                <p className="text-3xl font-bold">{value}</p>
                {/* <p className="text-xs mb-1">{label}</p> */}
            </div>
        </div>
        <div>
            {icon}
        </div>
    </div>
  )
}

export default DashboardCard