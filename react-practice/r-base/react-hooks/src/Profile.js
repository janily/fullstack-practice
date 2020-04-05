import React, { useState } from "react";
function Profile() {
  const [age, setAge] = useState(18);
  const [sex, setSex] = useState("男");
  const [work, setWork] = useState("前端程序员");
  return (
    <div>
      <p>JSPang 今年:{age}岁</p>
      <p>性别:{sex}</p>
      <p>工作是:{work}</p>
    </div>
  );
}
export default Profile;
