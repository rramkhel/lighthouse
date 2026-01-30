import React, { useState } from 'react';
import { ChevronRight, ChevronDown, ArrowRightLeft, Pencil, Calendar, MapPin, X } from 'lucide-react';

export default function BailHearingView() {
  const [expandedCases, setExpandedCases] = useState(new Set());
  const [moveModal, setMoveModal] = useState({ open: false, caseId: null, currentDate: null, currentCity: null });
  
  const [bailHearings, setBailHearings] = useState([
    {
      date: '2026-05-14',
      cities: [
        {
          name: 'Edmonton',
          cases: [
            {
              id: 1,
              styleOfCause: 'R. v. Smith',
              presentDate: '2025-03-24',
              crownPosition: 'Opposed on Secondary + Tertiary Grounds',
              bailResult: 'Pending',
              moveHistory: []
            },
            {
              id: 2,
              styleOfCause: 'R. v. Wade',
              presentDate: '2026-05-14',
              crownPosition: 'Opposed on Secondary Grounds',
              bailResult: 'Pending',
              moveHistory: [
                { fromDate: '2026-05-10', fromCity: 'Calgary', toDate: '2026-05-14', toCity: 'Edmonton', movedAt: '2026-01-15T10:30:00' }
              ]
            }
          ]
        },
        {
          name: 'Calgary',
          cases: [
            {
              id: 3,
              styleOfCause: 'R. v. Scooby',
              presentDate: '2026-05-14',
              crownPosition: 'Consent release',
              bailResult: 'Pending',
              moveHistory: []
            }
          ]
        }
      ]
    },
    {
      date: '2026-05-18',
      cities: [
        {
          name: 'Edmonton',
          cases: [
            {
              id: 5,
              styleOfCause: 'R. v. Velma',
              presentDate: '2026-05-18',
              crownPosition: 'Opposed on all grounds',
              bailResult: 'Pending',
              moveHistory: [
                { fromDate: '2026-05-10', fromCity: 'Red Deer', toDate: '2026-05-14', toCity: 'Calgary', movedAt: '2026-01-10T09:00:00' },
                { fromDate: '2026-05-14', fromCity: 'Calgary', toDate: '2026-05-18', toCity: 'Edmonton', movedAt: '2026-01-20T14:15:00' }
              ]
            }
          ]
        },
        {
          name: 'Red Deer',
          cases: [
            {
              id: 7,
              styleOfCause: 'R. v. Shaggy',
              presentDate: '2026-05-18',
              crownPosition: 'Reverse onus - opposed',
              bailResult: 'Pending',
              moveHistory: []
            }
          ]
        }
      ]
    }
  ]);

  const toggleCase = (caseId) => {
    const newExpanded = new Set(expandedCases);
    if (newExpanded.has(caseId)) {
      newExpanded.delete(caseId);
    } else {
      newExpanded.add(caseId);
    }
    setExpandedCases(newExpanded);
  };

  const openMoveModal = (caseId, currentDate, currentCity) => {
    setMoveModal({ open: true, caseId, currentDate, currentCity });
  };

  const closeMoveModal = () => {
    setMoveModal({ open: false, caseId: null, currentDate: null, currentCity: null });
  };

  const getAvailableDates = () => bailHearings.map(entry => entry.date);
  
  const getAvailableCities = () => {
    const cities = new Set();
    bailHearings.forEach(dateEntry => {
      dateEntry.cities.forEach(city => cities.add(city.name));
    });
    return Array.from(cities).sort();
  };

  const moveCase = (toDate, toCity) => {
    const { caseId, currentDate, currentCity } = moveModal;
    
    if (currentDate === toDate && currentCity === toCity) {
      closeMoveModal();
      return;
    }

    setBailHearings(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let caseToMove = null;

      // Find and remove the case
      for (const dateEntry of newData) {
        if (dateEntry.date === currentDate) {
          for (const cityEntry of dateEntry.cities) {
            if (cityEntry.name === currentCity) {
              const idx = cityEntry.cases.findIndex(c => c.id === caseId);
              if (idx > -1) {
                caseToMove = cityEntry.cases.splice(idx, 1)[0];
                break;
              }
            }
          }
        }
      }

      if (!caseToMove) return prev;

      // Add move to history
      if (!caseToMove.moveHistory) caseToMove.moveHistory = [];
      caseToMove.moveHistory.push({
        fromDate: currentDate,
        fromCity: currentCity,
        toDate: toDate,
        toCity: toCity,
        movedAt: new Date().toISOString()
      });

      // Find or create target date
      let targetDate = newData.find(d => d.date === toDate);
      if (!targetDate) {
        targetDate = { date: toDate, cities: [] };
        newData.push(targetDate);
        newData.sort((a, b) => new Date(a.date) - new Date(b.date));
      }

      // Find or create target city
      let targetCity = targetDate.cities.find(c => c.name === toCity);
      if (!targetCity) {
        targetCity = { name: toCity, cases: [] };
        targetDate.cities.push(targetCity);
        targetDate.cities.sort((a, b) => a.name.localeCompare(b.name));
      }

      targetCity.cases.push(caseToMove);

      // Cleanup empty entries
      newData.forEach(d => {
        d.cities = d.cities.filter(c => c.cases.length > 0);
      });
      return newData.filter(d => d.cities.length > 0);
    });

    closeMoveModal();
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Flatten for table rendering
  const rows = [];
  bailHearings.forEach(dateEntry => {
    let isFirstDate = true;
    dateEntry.cities.forEach(cityEntry => {
      let isFirstCity = true;
      cityEntry.cases.forEach(caseData => {
        rows.push({
          date: dateEntry.date,
          showDate: isFirstDate,
          city: cityEntry.name,
          showCity: isFirstCity,
          caseData
        });
        isFirstDate = false;
        isFirstCity = false;
      });
    });
  });

  // Find case info for modal
  let modalCaseName = '';
  let modalMoveHistory = [];
  if (moveModal.open) {
    for (const d of bailHearings) {
      for (const c of d.cities) {
        const found = c.cases.find(x => x.id === moveModal.caseId);
        if (found) { 
          modalCaseName = found.styleOfCause; 
          modalMoveHistory = found.moveHistory || [];
          break; 
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Bail Hearing Schedule</h1>
          <p className="text-gray-500 text-sm mt-1">Click a case to expand details • Use the move button to reschedule</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-300">
                <th className="px-4 py-3 text-left font-semibold text-slate-700 text-sm w-32">Date</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700 text-sm w-28">City</th>
                <th className="px-4 py-3 text-left font-semibold text-slate-700 text-sm">Style of Cause</th>
                <th className="px-4 py-3 text-right font-semibold text-slate-700 text-sm w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => {
                const isExpanded = expandedCases.has(row.caseData.id);
                const hasMoveHistory = row.caseData.moveHistory && row.caseData.moveHistory.length > 0;
                const isNewDate = row.showDate && idx > 0;

                return (
                  <React.Fragment key={row.caseData.id}>
                    {isNewDate && (
                      <tr><td colSpan="4" className="border-t-4 border-slate-300"></td></tr>
                    )}
                    <tr className={`hover:bg-slate-50 ${!row.showDate && !row.showCity ? 'border-t border-slate-100' : !row.showDate ? 'border-t border-slate-200' : ''}`}>
                      <td className="px-4 py-3 font-medium text-slate-900 align-top">
                        {row.showDate && formatDate(row.date)}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-600 align-top">
                        {row.showCity && row.city}
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => toggleCase(row.caseData.id)}
                          className="flex items-center gap-2 hover:text-blue-600"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          )}
                          <span className="font-medium">{row.caseData.styleOfCause}</span>
                          {hasMoveHistory && (
                            <span className="inline-flex items-center gap-1.5 text-xs text-amber-600">
                              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                              moved
                            </span>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => openMoveModal(row.caseData.id, row.date, row.city)}
                          className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                          title="Move to different date/city"
                        >
                          <ArrowRightLeft className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr>
                        <td></td>
                        <td></td>
                        <td colSpan="2" className="px-4 pb-4">
                          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm ml-6 space-y-4">
                            <div className="grid grid-cols-[140px_1fr] gap-y-2 gap-x-4">
                              <div className="text-slate-500 font-medium">Present Date:</div>
                              <div>{row.caseData.presentDate}</div>
                              <div className="text-slate-500 font-medium">Crown Position:</div>
                              <div>{row.caseData.crownPosition}</div>
                              <div className="text-slate-500 font-medium">Bail Result:</div>
                              <div className={row.caseData.bailResult === 'Pending' ? 'text-slate-500' : 'text-green-600 font-medium'}>
                                {row.caseData.bailResult}
                              </div>
                            </div>

                            {hasMoveHistory && (
                              <div className="border-t border-slate-200 pt-3 mt-2">
                                <div className="flex items-center text-xs text-slate-400 mb-2">
                                  <span>Scheduling History</span>
                                  <span className="ml-auto">Moved</span>
                                </div>
                                <div className="space-y-1.5">
                                  {[...row.caseData.moveHistory].reverse().map((move, i) => (
                                    <div key={i} className="flex items-center text-xs text-slate-500">
                                      <span>{formatDate(move.toDate)} · {move.toCity}</span>
                                      <span className="ml-auto text-slate-400">{formatDate(move.movedAt.split('T')[0])}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Move Modal */}
        {moveModal.open && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={(e) => e.target === e.currentTarget && closeMoveModal()}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
              <div className="bg-amber-600 text-white px-6 py-4 flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">Move Case</h3>
                  <p className="text-amber-100 text-sm mt-1">{modalCaseName}</p>
                </div>
                <button onClick={closeMoveModal} className="p-1 hover:bg-amber-500 rounded">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Current Location</div>
                  <div className="flex items-center gap-4 text-slate-700">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {formatDate(moveModal.currentDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {moveModal.currentCity}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">New Date</label>
                    <input 
                      type="date"
                      id="moveToDate"
                      defaultValue={moveModal.currentDate}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">New City</label>
                    <input 
                      type="text"
                      id="moveToCity"
                      defaultValue={moveModal.currentCity}
                      list="cityOptions"
                      placeholder="Type or select a city"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                    <datalist id="cityOptions">
                      {getAvailableCities().map(city => (
                        <option key={city} value={city} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {modalMoveHistory.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs text-slate-400 mb-1.5">Previous dates</div>
                    <div className="space-y-1">
                      {[...modalMoveHistory].reverse().map((move, i) => (
                        <div key={i} className="text-xs text-slate-500">
                          {formatDate(move.fromDate)} · {move.fromCity}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={closeMoveModal}
                    className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      const toDate = document.getElementById('moveToDate').value;
                      const toCity = document.getElementById('moveToCity').value;
                      moveCase(toDate, toCity);
                    }}
                    className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium"
                  >
                    Move Case
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
