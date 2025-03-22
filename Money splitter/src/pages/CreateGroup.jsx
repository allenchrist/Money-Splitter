import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/createGroup.css";

function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [memberName, setMemberName] = useState("");
  const [amount, setAmount] = useState("");
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState({});

  // Fetch groups from the database when the component mounts
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

  // Create a new group
  const createGroup = async () => {
    if (!groupName.trim()) return alert("Enter a group name");
    try {
      const res = await axios.post("http://localhost:5000/api/group/create", { groupName });
      setGroups([...groups, res.data.group]);
      setGroupName("");
    } catch (error) {
      alert(error.response?.data?.message || "Error creating group");
    }
  };

  // Select a group
  const selectGroup = (group) => {
    setSelectedGroup(group);
    setMembers(group.members);
  };

  // Add a member
  const addMember = async () => {
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

  // Add Expense (Splitting)
  const addExpense = async () => {
    if (!selectedGroup) return alert("Select a group first!");
    if (!amount || isNaN(amount) || amount <= 0) return alert("Enter a valid amount");

    try {
      const res = await axios.post("http://localhost:5000/api/group/add-expense", {
        groupId: selectedGroup._id,
        amount: parseFloat(amount),
      });

      setMembers(res.data.group.members); // Update UI
      setAmount("");
      alert("Expense added successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error adding expense");
    }
  };

  const handlePayment = async (memberName, paidAmount) => {
    if (!selectedGroup) return alert("Select a group first!");
    if (!paidAmount || isNaN(paidAmount) || paidAmount <= 0) return alert("Enter a valid amount");
  
    try {
      const res = await axios.put("http://localhost:5000/api/group/pay-amount", {
        groupId: selectedGroup._id,
        memberName,
        amount: parseFloat(paidAmount), // ✅ Fixed the variable
      });
  
      setMembers(res.data.group.members); // Update UI
      setPayments({ ...payments, [memberName]: "" });
      alert("Payment successful!");
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.response?.data?.message || "Error processing payment");
    }
  };
  
  

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Create Group</h2>

      {/* Create Group Form */}
      <div className="card p-3 mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={createGroup}>
            Create
          </button>
        </div>
      </div>

      {/* Groups List */}
      <div className="card p-3 mb-4">
        <h4>Your Groups</h4>
        {groups.map((group) => (
          <button
            key={group._id}
            className="btn btn-outline-dark w-100 mb-2"
            onClick={() => selectGroup(group)}
          >
            {group.name}
          </button>
        ))}
      </div>

      {/* Group Details */}
      {selectedGroup && (
        <div className="card p-3">
          <h4>Group: {selectedGroup.name}</h4>

          {/* Add Member */}
          <div className="input-group my-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter member name"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
            <button className="btn btn-success" onClick={addMember}>
              Add
            </button>
          </div>

          {/* Members List */}
          <h5>Members</h5>
          {members.map((member) => (
            <div
              key={member._id}
              className="d-flex justify-content-between align-items-center border p-2 mb-2"
            >
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

          {/* Add Expense */}
          <h5 className="mt-4">Add Expense</h5>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="btn btn-danger" onClick={addExpense}>
              Split
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateGroup;
