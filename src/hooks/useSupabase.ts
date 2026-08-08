import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../config/supabase';
import { dataStore } from '../lib/store';

export const useSupabase = () => {
  const [isConfigured] = useState(isSupabaseConfigured);
  const [storeState, setStoreState] = useState(() => ({
    students: dataStore.getStudents(),
    staff: dataStore.getStaff(),
    fees: dataStore.getFees(),
    homework: dataStore.getHomework(),
    submissions: dataStore.getSubmissions(),
    notices: dataStore.getNotices(),
    reportCards: dataStore.getReportCards(),
    attendance: dataStore.getAttendance(),
  }));

  useEffect(() => {
    const unsubscribe = dataStore.subscribe(() => {
      setStoreState({
        students: dataStore.getStudents(),
        staff: dataStore.getStaff(),
        fees: dataStore.getFees(),
        homework: dataStore.getHomework(),
        submissions: dataStore.getSubmissions(),
        notices: dataStore.getNotices(),
        reportCards: dataStore.getReportCards(),
        attendance: dataStore.getAttendance(),
      });
    });
    return unsubscribe;
  }, []);

  return {
    client: supabase,
    isConfigured,
    store: dataStore,
    ...storeState,
  };
};
