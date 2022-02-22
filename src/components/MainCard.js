import "./maincard.css";
import UserProfile from "./UserProfile";
import Avatar from "react-avatar";
import { Line } from "rc-progress";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers, setList } from "../Actions/actions";
import { SpinnerCircularFixed } from "spinners-react";
import Pagination from "./Pagination";
function MainCard(props) {
  const { card, user, data, loading, error } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  return (
    <div className="row">
      <div className="col-sm-8 offset-sm-2">
        <div className="card card-body shadow-sm p-3 mb-5 mt-5 maincard">
          {loading || !data ? (
            <SpinnerCircularFixed
              size={90}
              thickness={111}
              speed={173}
              color="#36ad47"
              secondaryColor="rgba(172, 57, 57, 0)"
            />
          ) : error ? (
            <h1 className="text-danger">{error}</h1>
          ) : (
            <table className="table table-borderless padding-table-columns">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Access</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  console.log(item.avatar);
                  return (
                    <UserProfile
                      isOwner={item.id === 1 ? true : false}
                      key={item.id}
                      first_name={item.first_name}
                      email={item.email}
                      last_name={item.last_name}
                      avatar={item.avatar}
                      id={item.id}
                    />
                  );
                })}
              </tbody>
            </table>
          )}

          {card && user && (
            <div className="card shadow-lg p-3 hovercard usercard">
              <div className="text-center">
                <Avatar round size="100" src={user.avatar} />
                <h6 className="mt-2">{`${user.first_name} ${user.last_name}`}</h6>
                <p className="userp">{user.email}</p>
                <p className="mt-1">Your Plan: Standard</p>
                <button className="btn btn-warning w-75 text-white">
                  Active User
                </button>
                <div className="mt-3">
                  <p>Plan Uses</p>
                  <Line
                    percent={25}
                    strokeWidth="2"
                    strokeColor="#feb23f"
                    className="mt-3 w-75 mx-2"
                  />
                </div>

                <div className="d-flex justify-content-center mt-3">
                  <div className="d-flex flex-column line-height">
                    <p className="times">2500</p>
                    <p className="desc">clicks reviewed</p>
                  </div>
                  <div className="d-flex flex-column devider"></div>
                  <div className="d-flex flex-column line-height">
                    <p className="times">5000</p>
                    <p className="desc">monthly clicks</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Pagination page={props.page} total_pages={props.total_pages} />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { card } = state.showReducer;
  const { user } = state.userReducer;
  const { loading } = state.users;
  const { error } = state.users;
  const { page, total_pages } = state.users.list;
  const data = state.listReducer;
  return {
    card,
    user,
    data,
    loading,
    error,
    page,
    total_pages,
  };
}

export default connect(mapStateToProps)(MainCard);
