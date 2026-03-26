import React from 'react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Articles', value: '1,284', change: '+12%', color: 'blue' },
    { label: 'AI Processed', value: '1,120', change: '+8%', color: 'indigo' },
    { label: 'Monthly Traffic', value: '450K', change: '+24%', color: 'emerald' },
    { label: 'AdSense Revenue', value: '$3,420', change: '+15%', color: 'amber' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-serif font-black text-slate-900">NcN Admin Control</h1>
            <p className="text-slate-500 text-sm">Monitor ingestion pipeline and revenue performance.</p>
          </div>
          <div className="flex gap-4">
             <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">
               Scrape All Now
             </button>
             <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-colors">
               Add New Source
             </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
               <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{stat.label}</div>
               <div className="flex items-end gap-3">
                  <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                  <span className={`text-xs font-bold mb-1 ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
               </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Sources Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold">Managed News Sources</h3>
                <span className="text-xs text-blue-600 font-bold bg-blue-50 px-3 py-1 rounded-full uppercase">All Active</span>
             </div>
             <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 border-b border-slate-100">
                   <tr>
                      <th className="px-6 py-4">Source Name</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Articles</th>
                      <th className="px-6 py-4">Last Fetched</th>
                      <th className="px-6 py-4 text-right">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                   {[
                     { name: 'BBC News', type: 'RSS', count: 432, time: '12m ago' },
                     { name: 'Reuters', type: 'RSS', count: 215, time: '4m ago' },
                     { name: 'Al Jazeera', type: 'RSS', count: 189, time: '1h ago' },
                     { name: 'X Feed (AI)', type: 'Social', count: 154, time: '30m ago' },
                     { name: 'CNN', type: 'RSS', count: 290, time: '22m ago' },
                   ].map((source, i) => (
                     <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold">{source.name}</td>
                        <td className="px-6 py-4 text-slate-500">{source.type}</td>
                        <td className="px-6 py-4 font-mono">{source.count}</td>
                        <td className="px-6 py-4 text-slate-400">{source.time}</td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-blue-600 hover:text-blue-700 font-bold">Edit</button>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>

          {/* Pending Review Section */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold">Pending AI Review</h3>
             </div>
             <div className="p-6 space-y-6">
                {[
                  { title: 'New Tech Regulation in EU...', time: '5m ago', score: 98 },
                  { title: 'Global Markets React to...', time: '12m ago', score: 92 },
                  { title: 'Future of Sustainable...', time: '45m ago', score: 85 },
                ].map((item, i) => (
                   <div key={i} className="group border-b border-slate-50 pb-4 last:border-0 hover:border-indigo-100 transition-colors">
                      <div className="flex justify-between items-start mb-1">
                         <h4 className="font-bold text-sm line-clamp-1 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                         <span className="text-[10px] font-black text-emerald-500">{item.score}% Confidence</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] text-slate-400 uppercase tracking-widest">{item.time}</span>
                         <div className="ml-auto flex gap-2">
                            <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Approve</button>
                            <button className="text-[10px] font-black text-red-400 uppercase tracking-widest hover:underline">Discard</button>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
             <div className="p-6 bg-slate-50 text-center">
                <button className="text-xs font-bold text-slate-500 hover:text-slate-800">View All Pending Tasks</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
