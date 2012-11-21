var   mocha = require('mocha')
    , should = require('should')
    , fs = require('fs');

describe('Copy', function(){

    before(function(done){

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
            done();
        });
    });

    after(function(done){

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
                done();
            });
        });
    });

    
    it('should copy a file asynchronous',function(done){
        
        var src = this.src,
        dst = this.dst
        fs = this.fs;
    
        fs.copy(src,dst,function(err){

            if(!err){

                fs.readFile(dst,function(err,data){

                    var content = data.toString();
                    content.should.eql('CaWaBuNgA');
                    (err==null).should.be.ok;
                    data.should.be.an.instanceof(Buffer);
                    done();
                });


            }else{
                err.should.eql(null);
                done();
            }
        });
    });

    it('should copy a file synchronous',function(){

        var src = this.src,
        dst = this.dst
        fs = this.fs;

        fs.copySync(src, dst);
        var content = fs.readFileSync(dst).toString();
        content.should.eql('CaWaBuNgA');
    });
});