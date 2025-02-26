import { useState } from "react";
import "../styles/createGroup.css";
import Navbar from "../components/Navbar";


function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [memberName, setMemberName] = useState("");
  const [amount, setAmount] = useState("");
  const [members, setMembers] = useState([]);
  const [payments, setPayments] = useState({});

  // Create a new group
  const createGroup = () => {
    if (!groupName.trim()) return alert("Enter a group name");
    const newGroup = { id: Date.now(), name: groupName, members: [] };
    setGroups([...groups, newGroup]);
    setGroupName("");
  };

  // Select a group
  const selectGroup = (group) => {
    setSelectedGroup(group);
    setMembers(group.members);
  };

  // Add a member to the selected group
  const addMember = () => {
    if (!selectedGroup) return alert("Select a group first!");
    if (!memberName.trim()) return alert("Enter a member name");
    const updatedMembers = [...members, { id: Date.now(), name: memberName, amountDue: 0 }];
    setMembers(updatedMembers);
    selectedGroup.members = updatedMembers;
    setMemberName("");
  };

  // Split an expense equally among members
  const addExpense = () => {
    if (!selectedGroup) return alert("Select a group first!");
    if (!amount || isNaN(amount) || amount <= 0) return alert("Enter a valid amount");
    const splitAmount = parseFloat(amount) / members.length;
    const updatedMembers = members.map((member) => ({
      ...member,
      amountDue: member.amountDue + splitAmount,
    }));
    setMembers(updatedMembers);
    selectedGroup.members = updatedMembers;
    setAmount("");
  };

  // Handle payment
  const handlePayment = (memberId, paidAmount) => {
    if (!paidAmount || isNaN(paidAmount) || paidAmount <= 0) return alert("Enter a valid amount");
    const updatedMembers = members.map((member) =>
      member.id === memberId
        ? { ...member, amountDue: Math.max(0, member.amountDue - parseFloat(paidAmount)) }
        : member
    );
    setMembers(updatedMembers);
    setPayments({ ...payments, [memberId]: "" });
  };

  return (
    <div className="create-group">
      <div className="group-card">
        <h2>Create Group</h2>
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button onClick={createGroup}>Create Group</button>
      </div>

      <div className="groups-list">
        <h3>Your Groups</h3>
        {groups.map((group) => (
          <div key={group.id} className="group-item" onClick={() => selectGroup(group)}>
            {group.name}
          </div>
        ))}
      </div>

      {selectedGroup && (
        <div className="group-details">
          <h3>Group: {selectedGroup.name}</h3>
          <div className="member-input">
            <input
              type="text"
              placeholder="Add Member"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
            <button onClick={addMember}>Add</button>
          </div>

          <h4>Members</h4>
          {members.map((member) => (
            <div key={member.id} className="member-card">
              <p>{member.name}</p>
              <p>₹{member.amountDue.toFixed(2)}</p>
              <input
                type="number"
                placeholder="Pay Amount"
                value={payments[member.id] || ""}
                onChange={(e) => setPayments({ ...payments, [member.id]: e.target.value })}
              />
              <button onClick={() => handlePayment(member.id, payments[member.id])}>Pay</button>
            </div>
          ))}

          <h4>Add Expense</h4>
          <div className="expense-input">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={addExpense}>Split</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateGroup;
