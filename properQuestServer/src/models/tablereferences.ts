import { User, UserPassword, UserDocument } from './user.model';
import { Property, Message, LikedProperty } from './property.model';

// User - UserPassword
User.hasOne(UserPassword, { foreignKey: 'userId' });
UserPassword.belongsTo(User, { foreignKey: 'userId' });

// User - UserDocument
User.hasOne(UserDocument, { foreignKey: 'userId' });
UserDocument.belongsTo(User, { foreignKey: 'userId' });

// User - Property
User.hasOne(Property, { foreignKey: 'userId' });
Property.belongsTo(User, { foreignKey: 'userId' });

// User - Message
User.hasOne(Message, { foreignKey: 'userId' });
Message.belongsTo(User, { foreignKey: 'userId' });

// Property - Message
Property.hasOne(Message, { foreignKey: 'propertyId' });
Message.belongsTo(Property, { foreignKey: 'propertyId' });

//Property - LikedProperty

// User - LikedProperty (one-to-many)
User.hasMany(LikedProperty, { foreignKey: 'userId' });
LikedProperty.belongsTo(User, { foreignKey: 'userId' });

// Property - LikedProperty (one-to-many)
Property.hasMany(LikedProperty, { foreignKey: 'propertyId' });  
LikedProperty.belongsTo(Property, { foreignKey: 'propertyId' });


