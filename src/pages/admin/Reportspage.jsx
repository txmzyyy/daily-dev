import React, { useEffect, useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import { useDispatch, useSelector } from 'react-redux';

import {
  loadReports,
  dismiss,
  resolve,
} from '../../features/moderation/moderationSlice';

import {
  Check,
  X,
} from 'lucide-react';

export default function ReportsPage() {
  const dispatch = useDispatch();

  const {
    reports = [],
    status,
    error,
  } = useSelector(
    (state) => state.moderation
  );

  const [reportStatus, setReportStatus] =
    useState('pending');

  useEffect(() => {
    dispatch(loadReports(reportStatus));
  }, [dispatch, reportStatus]);

  const handleDismiss = async (id) => {
    try {
      await dispatch(dismiss(id)).unwrap();
      dispatch(loadReports(reportStatus));
    } catch (err) {
      console.error('Failed to dismiss report:', err);
    }
  };

  const handleResolve = async (id) => {
    try {
      await dispatch(resolve(id)).unwrap();
      dispatch(loadReports(reportStatus));
    } catch (err) {
      console.error('Failed to resolve report:', err);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Content Reports
          </h1>

          <p className="text-xs text-zinc-400 mt-1">
            Review reports submitted by users.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2">

          {[
            'pending',
            'resolved',
            'dismissed',
          ].map((option) => (
            <button
              key={option}
              onClick={() => setReportStatus(option)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold capitalize transition ${
                reportStatus === option
                  ? 'bg-indigo-600 text-white'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {option}
            </button>
          ))}

        </div>

        {/* Loading */}
        {status === 'loading' && (
          <div className="text-center py-12 text-zinc-500">
            Loading reports...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-950/30 border border-red-500/30 rounded-xl p-4">
            <p className="text-sm text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Reports */}
        {status !== 'loading' &&
          reports.length > 0 && (
            <div className="space-y-4">

              {reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl"
                >

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                    <div>

                      <p className="text-sm font-bold text-white">
                        Report #{report.id}
                      </p>

                      <p className="text-xs text-zinc-400 mt-2">
                        Reason: {report.reason}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">

                        <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded">
                          Content: {report.content_id}
                        </span>

                        <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded capitalize">
                          {report.status}
                        </span>

                      </div>

                    </div>

                    {report.status === 'pending' && (
                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleDismiss(report.id)
                          }
                          className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-lg hover:text-white text-xs font-semibold"
                        >
                          <X size={15} />
                          Dismiss
                        </button>

                        <button
                          onClick={() =>
                            handleResolve(report.id)
                          }
                          className="flex items-center gap-1.5 px-3 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600/30 text-xs font-semibold"
                        >
                          <Check size={15} />
                          Resolve
                        </button>

                      </div>
                    )}

                  </div>

                </div>
              ))}

            </div>
          )}

        {/* Empty */}
        {status !== 'loading' &&
          reports.length === 0 &&
          !error && (
            <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl">
              <p className="text-sm text-zinc-400">
                No {reportStatus} reports.
              </p>
            </div>
          )}

      </div>
    </AppLayout>
  );
}