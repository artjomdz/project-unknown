exports.allAccess = (res, req) => {
    res.status(200).send('Public Content');
};

exports.userBoard = (res, req) => {
    res.status(200).send('User Content');
};

exports.adminBoard = (res, req) => {
    res.status(200).send('Admin Content');
};

exports.moderatorBoard = (res, req) => {
    res.status(200).send('Moderator Content');
};
