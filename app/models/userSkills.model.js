export default (sequelize, DataTypes) => {
  const UserSkills = sequelize.define("user_skills", {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    skill_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  return UserSkills;
};
