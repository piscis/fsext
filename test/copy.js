var testCase = require('nodeunit').testCase;

module.exports = testCase({

	setUp: function (callback) {

		// setup test
		var filesys = require('fs');
		this.fs = require(__dirname+'/../index');
		this.src = __dirname+'/data/stub.txt';
		this.dst = __dirname+'/data/stub_copy.txt';

		var that = this;

		filesys.writeFile(that.src, 'CaWaBuNgA', function (err) {
  			if (err) {
				 throw err;
			}
			callback();
		});

	},

	tearDown: function (callback) {

		// clean up
		var fs = require('fs');
		var that = this;

		fs.unlink(that.src, function (err) {
  			if (err) {
				throw err;
			}

			fs.unlink(that.dst, function (err) {
  				if (err) {
					throw err;
				}
				callback();
			});
		});

	},

	testCopy: function (test) {

		var test = test;
		test.expect(1);
		
		var src = this.src,
		dst = this.dst
		fs = this.fs;
	
		fs.copy(src,dst,function(err) {

			if(typeof err == 'undefined') {

				fs.readFile(dst,function(err,data) {
					test.ok(data.toString()=='CaWaBuNgA');
					test.done();
				});

			} else {
				test.fail('There was an error: '+err);
				test.done();
			}
		});
			
	},

  testCopySync: function(test) {

		test.expect(1);

		var src = this.src,
		dst = this.dst
		fs = this.fs;

    fs.copySync(src,dst);
		test.ok(fs.readFileSync(dst).toString()=='CaWaBuNgA', 'Content of src and dst file not the same');		
		test.done();

	}
	
});
