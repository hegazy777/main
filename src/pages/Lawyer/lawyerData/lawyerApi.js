import axios from 'axios';
import useAsync from 'src/hooks/useAsync';
import baseUrl from 'src/API/apiConfig';

const LawyerApi = (lawyerId, token) => {

  const { data, loading, execute } = useAsync(() => axios.get(`${baseUrl}/api/customer/lawyers/8`, { headers: { Authorization: `Bearer ${token}` } }),

    { immediate: false }

  );

  return { data, loading, execute };
};

export default LawyerApi;
