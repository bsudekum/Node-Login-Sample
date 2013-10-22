module.exports = function(req, res, ok) {

	var sessionUserMatchesId = req.session.User.id === req.param('id');
	var isAdmin = req.session.User.admin;

	if(!(sessionUserMatchesId || isAdmin)) {

		var nonRightsError = [{name: 'noRights', message: 'You must be an admin.'}]
		req.session.flash = {
			err: nonRightsError
		}

		res.redirect('/session/new');
		return;
	}

	ok();
};