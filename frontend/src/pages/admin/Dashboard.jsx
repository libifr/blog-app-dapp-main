import React from "react";
import useProfile from "../../hooks/useProfile";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader";

const Item = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 flex-1">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

function Dashboard() {
  const profile = useProfile();
  const { data: stats, loading, error } = useFetch("/stats");

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  if (error) {
    <div className="bg-red-100 p-3 mx-20 my-5 rounded-sm text-red-500 text-center">
      {error}
    </div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {profile.role === "Admin" ? (
          <>
            <Item title="Total Users" value={stats?.totalUsers} />
            <Item title="Total Posts" value={stats?.totalPosts} />
            <Item title="Total Comments" value={stats?.totalComments} />
            <Item
              title="Total Pending Posts"
              value={stats?.totalPendingPosts}
            />
          </>
        ) : (
          <>
            <Item title="Total Posts" value={stats?.totalPosts} />
            <Item title="My Pending Posts" value={stats?.totalPendingPosts} />
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
