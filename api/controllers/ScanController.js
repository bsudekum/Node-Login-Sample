/**
 * ScanController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  new: function (req, res) {
    res.view();
  },

  create: function (req, res) {

    Scan.create( req.params.all(), function scanCreated (err, scan) {
      return res.redirect('/scan/show/' + scan.id )
    });

    // });
  },

  show: function (req, res, next) {
    
    Scan.findOne(req.param('id'), function foundScan (err, scan){
      User.findOne(req.param('id'), function foundUser (err, user){
      
        if (err) return next(err);
        if (!scan) return next();

        res.view({
          scan: scan,
          user: user
        });

      });

    });

  },


  /**
   * /scan/destroy
   */ 
  destroy: function (req,res) {

    // This will render the view: 
    // /Scans/BobbySudekum/Documents/projects/sails-auth/views/scan/destroy.ejs
    res.view();

  }

};
