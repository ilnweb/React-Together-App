import React from "react";
import "./search-modal.scss";
import { firestore, createNewConnection } from "../../firebase/firebase.config";
import ItemUser from "../item-user/item-user.cmp";
import { Modal, Button, Input, Avatar } from "antd";
import UploadImage from "../upload-image/upload-image.cmp";
import { letterName } from "../../functions/functions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

class SearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      userSearch: "",
      userList: "",
      invitedfriends: "",
      connectionName: "",
      connectionImg: "",
      noFriendsInvited: false,
      noConnectionName: false,
    };
  }

  componentDidMount() {
    firestore
      .collection("users")
      .get()
      .then((querySnapshot) => {
        const userArr = [];
        querySnapshot.docs.map((doc) => {
          userArr.push({
            id: doc.id,
            displayName: doc.data().displayName,
            photoURL: doc.data().photoURL,
          });
          return doc.data();
        });
        this.setState({
          userList: userArr,
        });
      });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      userSearch: "",
      userList: "",
      invitedfriends: "",
      connectionName: "",
    });
  };

  handleClick = (item) => {
    if (!this.state.invitedfriends.includes(item)) {
      this.setState((prevState) => ({
        invitedfriends: [...this.state.invitedfriends, item],
        userSearch: "",
      }));
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    this.setState({
      noConnectionName: false,
    });
  };

  handleImage = (imageUrl) => {
    this.setState({
      connectionImg: imageUrl,
    });
  };

  handleCreate = () => {
    const { invitedfriends, connectionName, connectionImg } = this.state;
    const { currentUser } = this.props;
    if (!connectionName) {
      this.setState({
        noConnectionName: true,
      });
      return;
    }
    if (!invitedfriends) {
      this.setState({
        noFriendsInvited: true,
      });
      return;
    }
    const currentUserData = {
      displayName: currentUser.displayName,
      id: currentUser.id,
      photoURL: currentUser.photoURL,
    };
    invitedfriends.push(currentUserData);
    createNewConnection(
      connectionName,
      connectionImg,
      invitedfriends,
      currentUser
    );
    this.handleCancel();
  };

  render() {
    const {
      userList,
      userSearch,
      invitedfriends,
      noFriendsInvited,
      noConnectionName,
    } = this.state;
    return (
      <div>
        <Button
          className="mt-30"
          shape="round"
          size="large"
          type="primary"
          onClick={this.showModal}
        >
          Create new Group
        </Button>
        <Modal
          className="search-modal"
          title="Create new Group"
          style={{ top: 20 }}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <div className="conection-details">
            <div className="search-user-list mt-10">
              <p>Search friends</p>
              <Input.Search
                className="mb-20"
                name="userSearch"
                placeholder="Search user by name"
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                value={userSearch}
                size="large"
                enterButton
              />
              {userSearch &&
                userList &&
                userList.map(
                  (item) =>
                    item.displayName
                      .toLowerCase()
                      .includes(userSearch.toLowerCase()) && (
                      <ItemUser
                        key={item.id}
                        item={item}
                        handleClick={this.handleClick}
                      />
                    )
                )}
            </div>
            <div className="search-user-list mb-20">
              Group Name
              {noConnectionName ? (
                <div className="field-error flex-c">Add a Group name</div>
              ) : (
                ""
              )}
              <Input
                id="name"
                name="connectionName"
                value={this.state.connectionName}
                className="input-style"
                type="text"
                label="name"
                size="large"
                placeholder="Your new connection name"
                autoComplete="true"
                onChange={this.handleChange}
              />
            </div>
            <div className="search-user-list mb-20">
              <p>Group Image</p>
              <UploadImage handleImage={this.handleImage} />
            </div>
            <div className="search-user-list mb-20">
              <p>Group invited friends</p>
              <div className="invited-friends flex-c">
                {invitedfriends ? (
                  invitedfriends.map((item) => (
                    <Avatar
                      className="avatar-small-no-picture m-5"
                      key={item.id}
                      size="large"
                      src={item.photoURL}
                    >
                      {letterName(item.displayName)}
                    </Avatar>
                  ))
                ) : noFriendsInvited ? (
                  <div className="field-error flex-c">
                    "Invite Atleast one Friend"
                  </div>
                ) : (
                  <div>"No friends Invited"</div>
                )}
              </div>
            </div>
          </div>
          <hr />

          <Button
            className="mt-30"
            shape="round"
            size="large"
            type="primary"
            onClick={this.handleCreate}
          >
            Create
          </Button>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(SearchModal);
