module.exports = function (sequelize, DataTypes) {

    var tableName = "users";

    var attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        v_username: DataTypes.STRING,
        v_password: DataTypes.STRING,
        v_email: DataTypes.STRING,
        v_first_name: DataTypes.STRING,
        v_last_name: DataTypes.STRING,
        v_gender: DataTypes.STRING,
        i_dob: DataTypes.INTEGER,
        v_mrn: DataTypes.STRING,
        v_ssn: DataTypes.STRING,
        v_picture: DataTypes.STRING,
        b_picture_resized:DataTypes.BOOLEAN,
        v_address1: DataTypes.STRING,
        v_zip: DataTypes.STRING,
        v_phone: DataTypes.STRING,
        v_mobile: DataTypes.STRING,
        v_address2: DataTypes.STRING,
        v_city: DataTypes.STRING,
        v_state: DataTypes.STRING,
        v_country: DataTypes.STRING,

        v_session_key: DataTypes.STRING,
        i_session_timestamp: DataTypes.INTEGER,    
        i_created: DataTypes.INTEGER,
        i_status: DataTypes.INTEGER,
        i_appointment_duration: DataTypes.INTEGER,
        i_user_role: DataTypes.INTEGER
        
        /*
        v_blood_type: DataTypes.STRING,
        fk_marital_status_id: DataTypes.INTEGER,
        fk_language_id: DataTypes.INTEGER,
        fk_ethnicity_id: DataTypes.INTEGER,
        fk_military_service_id: DataTypes.INTEGER,
        fk_religion_id: DataTypes.INTEGER,
        t_note: { type: DataTypes.TEXT },
        fk_care_location_id: DataTypes.INTEGER,
        fk_language_id: DataTypes.INTEGER,
        v_role_title: DataTypes.STRING,
        i_last_login_date: DataTypes.INTEGER,
        v_code_status:DataTypes.STRING*/
    };

    return sequelize.define(tableName, attributes);
}