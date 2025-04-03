import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/createGroup.css";

function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [password, setPassword] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [memberName, setMemberName] = useState("");
  const [amount, setAmount] = useState("");
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState({});

  // Fetch groups
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/group/my-groups");
        setGroups(res.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, []);

  // Create a new group with password
  const createGroupHandler = async () => {
    if (!groupName.trim() || !password.trim()) {
      return alert("Enter group name and password");
    }
    try {
      const res = await axios.post("http://localhost:5000/api/group/create", {
        groupName,
        password,
      });
      setGroups([...groups, res.data.group]);
      setGroupName("");
      setPassword("");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating group");
    }
  };

  // Select group (password verification)
  const selectGroup = async (group) => {
    const enteredPass = prompt(`Enter password for ${group.name}:`);
    if (!enteredPass) return;
    try {
      const res = await axios.post("http://localhost:5000/api/group/get", {
        groupName: group.name,
        password: enteredPass,
      });
      setSelectedGroup(res.data);
      setMembers(res.data.members);
    } catch (error) {
      alert(error.response?.data?.message || "Incorrect password!");
    }
  };

  // Add a member
  const addMemberHandler = async () => {
    if (!selectedGroup) return alert("Select a group first!");
    if (!memberName.trim()) return alert("Enter a member name");
    try {
      const res = await axios.post("http://localhost:5000/api/group/add-member", {
        groupId: selectedGroup._id,
        memberName,
      });
      setMembers(res.data.group.members);
      setMemberName("");
    } catch (error) {
      alert(error.response?.data?.message || "Error adding member");
    }
  };

  // Add expense
  const addExpenseHandler = async () => {
    if (!selectedGroup) return alert("Select a group first!");
    if (!amount || isNaN(amount) || amount <= 0) return alert("Enter a valid amount");
    try {
      const res = await axios.post("http://localhost:5000/api/group/add-expense", {
        groupId: selectedGroup._id,
        amount: parseFloat(amount),
      });
      setMembers(res.data.group.members);
      setAmount("");
      alert("Expense added successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error adding expense");
    }
  };

  // Handle payment
  const handlePayment = async (memberName, paidAmount) => {
    if (!selectedGroup) return alert("Select a group first!");
    if (!paidAmount || isNaN(paidAmount) || paidAmount <= 0) return alert("Enter a valid amount");
    try {
      const res = await axios.put("http://localhost:5000/api/group/pay-amount", {
        groupId: selectedGroup._id,
        memberName,
        amount: parseFloat(paidAmount),
      });
      setMembers(res.data.group.members);
      setPayments({ ...payments, [memberName]: "" });
      alert("Payment successful!");
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.response?.data?.message || "Error processing payment");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">💰 Create & Manage Groups</h2>

      {/* Create Group Form */}
      <div className="card mb-4">
        <h4>Create Group</h4>
        <div className="input-group create-group-input">
          <input
            type="text"
            className="form-control"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary" onClick={createGroupHandler}>
            Create
          </button>
        </div>
      </div>

      {/* Groups List as a Grid */}
      <div className="group-grid">
        {groups.map((group) => (
          <div key={group._id} className="group-card">
            <h5 className="group-card-title">{group.name}</h5>
            <p className="group-card-text">{group.members.length} members</p>
            <button className="btn btn-outline-dark w-100" onClick={() => selectGroup(group)}>
              View Group
            </button>

            {/* If this group is selected, display details below */}
            {selectedGroup && selectedGroup._id === group._id && (
              <div className="group-details mt-3">
                <div className="input-group my-3 add-member">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter member name"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                  />
                  <button className="btn btn-success" onClick={addMemberHandler}>
                    Add
                  </button>
                </div>

                <h5>Members</h5>
                {members.map((member) => (
                  <div key={member._id} className="member-card">
                    <div>
                      <strong>{member.name}</strong> - ₹{member.amountDue.toFixed(2)}
                    </div>
                    <div className="input-group w-50">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Amount"
                        value={payments[member.name] || ""}
                        onChange={(e) =>
                          setPayments({ ...payments, [member.name]: e.target.value })
                        }
                      />
                      <button
                        className="btn btn-warning"
                        onClick={() => handlePayment(member.name, payments[member.name])}
                      >
                        Pay
                      </button>
                    </div>
                  </div>
                ))}

                <div className="expense-section">
                  <h5 className="mt-4">Add Expense</h5>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <button className="btn btn-danger" onClick={addExpenseHandler}>
                      Split
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateGroup;
