

/*
 /!**
 * Created by Life on 2016-12-01.
 *!/
 var http = require('http');
 var path = require('path');
 var express = require('express');

 var app = express();

 http.createServer(app).listen('3000',function(){
 console.log('서버 실행 포트는 3000!!');
 });

 app.use(express.static(__dirname));

 app.get('/',function(req,res){
 res.sendFile(path.join(__dirname + '/index.html'));
 });*/

/**
 * Created by Life on 2016-12-01.
 * @param title Database
 * @param author Parksubin
 */

var http = require('http');
var path = require('path');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
var url =require('url');
var app = express();

//TODO:미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookie());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret :'subin',
    resave :false,
    saveUninitialized: true
}));

//TODO:Server구동
http.createServer(app).listen('3000',function(){
    console.log('서버 실행 포트는 3000!!');
});

//TODO:DB Connection
var pool = mysql.createPool({
    connectionLimit: 15,
    host: 'localhost',
    user: 'root',
    database:'ppparksubin',
    password: '1234'
});

app.use(express.static(__dirname));

//TODO:메인페이지 FS
app.get('/',function(req,res){

    res.sendFile(path.join(__dirname + '/index.html'));
});

//TODO:메인페이지에 데이터 뿌림
app.get('/list',function (req,res,next) {

    console.log("왔다 장보리!");
    pool.getConnection(function (error,connection) {

        var sql="SELECT project.project_co,project.title,project.content,project.budget,project.period,project_category.big_category_co,project_category.small_category_co,project_hold_skill.skill_co from project,project_category,project_hold_skill where project.project_co=project_category.project_co and project.project_co=project_hold_skill.project_co and project.state_co=? order by budget limit 6;";


        connection.query(sql,2,function (err, data) {

            if (err) console.error("err : " + err);

            // console.log(data);

            res.send(data);

            connection.release();
        });
    });
});

app.get('/updateCompleteProject/:co',function (req,res,next) {

    var key = req.params.co;

    pool.getConnection(function (error,connection) {

        var sql="update project set state_co=3 where project_co=?";

        connection.query(sql,[key],function (err, data) {

            if (err) console.error("err : " + err);
            console.log(data);
            res.send(data);
            connection.release();
        });
    });
});

app.post('/updateAdopt',function (req,res,next) {

    var project_co=req.body.project_co;
    var partner_id=req.body.partner_id;

    pool.getConnection(function (error,connection) {

        var sql="update project_team set adopt_ck=1 where project_co=? and partner_id=?";

        connection.query(sql,[project_co,partner_id],function (err, data) {

            if (err) console.error("err : " + err);

            console.log(data);
            res.send(data);
            connection.release();
        });
    });
});


app.post('/cancelAdopt',function (req,res,next) {

    var project_co=req.body.project_co;
    var partner_id=req.body.partner_id;

    pool.getConnection(function (error,connection) {

        var sql="update project_team set adopt_ck=0 where project_co=? and partner_id=?";

        connection.query(sql,[project_co,partner_id],function (err, data) {

            if (err) console.error("err : " + err);

            console.log(data);
            res.send(data);
            connection.release();
        });
    });
});

app.get('/getApplicantPartner/:co',function (req,res,next) {

    var key=req.params.co;
    var client = req.session.user_id;



    pool.getConnection(function (error,connection) {

        var sql="SELECT project.project_co,project.client_id,project.title,project.content,project.budget,project.count,project.end_day,project_category.big_category_co,project_category.small_category_co from project,project_category where project.project_co=project_category.project_co and project.project_co=? and project.state_co=2";

        connection.query(sql,[key],function (err, data) {

            if (err) console.error("err : " + err);

            console.log(data);
            var sql2="select partner_id from project_team where project_co=? and adopt_ck=0";

            connection.query(sql2,[key],function (err,suc) {

                if (err) console.error("err : " + err);

                var datas = {
                    "detail" : data,
                    "partner":suc
                };

                console.log(datas);
                res.send(datas);
                connection.release();
            })
        });
    });

});

app.get('/Search',function (req,res,next) {
    console.log("하이");
    pool.getConnection(function (error,connection) {

        var sql="SELECT project.project_co,project.client_id,project.title,project.budget,project.count,project.end_day,project_category.big_category_co,project_category.small_category_co from project,project_category where state_co=? and project.project_co=project_category.project_co";


        connection.query(sql,2,function (err, data) {

            if (err) console.error("err : " + err);

            console.log(data);

            var sql2="select count(*)cnt from project";

            connection.query(sql2,function (err,suc) {



                var succ = {
                    "search" : data,
                    "count":suc[0].cnt
                };

                res.send(succ);
                connection.release();
            });

        });
    });
});

app.get('/getPartnerList/:co',function (req,res,next) {


    var key= req.params.co;

    pool.getConnection(function (error,connection) {

        var sql="select partner_id from project_team where project_co=?";

        connection.query(sql,[key],function (err, data) {

            if (err) console.error("err : " + err);

            console.log(data);
            // console.log(data);
            res.send(data);
            connection.release();
        });
    });

});
app.post('/addAppraisal',function (req,res,next) {


    var project_co =req.body.project_co;
    var partner_id=req.body.partner_id;
    var profession=req.body.profession;
    var satisfaction=req.body.satisfaction;
    var comunication=req.body.comunication;
    var schedule=req.body.schedule;
    var initiative=req.body.initiative;
    var client_id=req.session.user_id;
    var eva="0";
    var thou="수고했습니다";

    console.log(project_co);
    console.log(partner_id);
    console.log(profession);
    console.log(satisfaction);
    console.log(comunication);
    console.log(schedule);
    console.log(initiative);
    console.log(client_id);
    console.log(thou);
    console.log(eva);


    var suc=[project_co,client_id,partner_id,profession,satisfaction,comunication,schedule,initiative,thou,eva];

    pool.getConnection(function (error,connection) {

    console.log(suc);

        var sql= "insert into project_appraisal(project_co, client_id, partner_id, pro_sc, sat_sc, com_sc, sch_obey_sc, init_sc, thou, eva) values (?)";

           connection.query(sql,[suc],function (err, data) {

                    if (err) console.error("err : " + err);

                    console.log(data);
                    // console.log(data);
                    res.send(data);
                    connection.release();
                });

        });

});

app.get('/getPartner/:co',function (req,res,next) {

    console.log("bbbbbbbbbbbbbbbbbbbbbbbb");
    var partner_id = req.params.co;

    pool.getConnection(function (error,connection) {

        var sql="select partner_id,ind from partner where partner_id=?";

        connection.query(sql,[partner_id],function (err, data) {

            if (err) console.error("err : " + err);

            console.log(data);
            // console.log(data);
            res.send(data);
            connection.release();
        });
    });


});

app.get('/getProjectAppraisal',function (req,res,next) {

    var key = req.session.user_id;

    pool.getConnection(function (error,connection) {

        var sql="SELECT project.project_co,project.client_id,project.title,project.content,project.budget,project.count,project.end_day,project_category.big_category_co,project_category.small_category_co from project,project_category where project.project_co=project_category.project_co and project.client_id=? and project.state_co=?";


        connection.query(sql,[key,4],function (err, data) {

            if (err) console.error("err : " + err);

            console.log(data);
            // console.log(data);
            res.send(data);
            connection.release();
        });
    });


});



//TODO:진행중인 프로젝트
app.get('/getProgressProject',function (req,res,next) {

    var key = req.session.user_id;
    console.log("세션확인");
    console.log(key);
    pool.getConnection(function (error,connection) {

        var sql="SELECT project.project_co,project.client_id,project.title,project.budget,project.count,project.end_day,project_category.big_category_co,project_category.small_category_co from project,project_category where project.project_co=project_category.project_co and project.client_id=? and project.state_co=?";


        connection.query(sql,[key,3],function (err, data) {

            if (err) console.error("err : " + err);

            console.log(data);
            // console.log(data);
            res.send(data);
            connection.release();
        });
    });

});

//TODO:완료한 프로젝트
app.get('/getCompleteProject',function (req,res,next) {

    var key = req.session.user_id;
    console.log("세션확인");
    console.log(key);

    pool.getConnection(function (error,connection) {

        var sql="SELECT project.project_co,project.client_id,project.title,project.budget,project.count,project.end_day,project_category.big_category_co,project_category.small_category_co from project,project_category where project.project_co=project_category.project_co and project.client_id=? and project.state_co=?";


        connection.query(sql,[key,5],function (err, data) {

            if (err) console.error("err : " + err);

            console.log(data);
            // console.log(data);
            res.send(data);
            connection.release();
        });
    });
});


//TODO:지원자 채택 프로젝트
app.get('/getApplicantProjectList',function (req,res,next) {

    var key = req.session.user_id;
    console.log("세션확인");
    console.log(key);
    ;
    pool.getConnection(function (error,connection) {

        var sql="SELECT project.project_co,project.client_id,project.title,project.budget,project.count,project.end_day,project_category.big_category_co,project_category.small_category_co from project,project_category where project.project_co=project_category.project_co and project.client_id=? and project.state_co=?";


        connection.query(sql,[key,2],function (err, data) {

            if (err) console.error("err : " + err);

            console.log(data);
            // console.log(data);
            res.send(data);
            connection.release();
        });
    });
});

app.get('/getMyProjectList',function (req,res,next) {

    var key = req.session.user_id;
console.log("세션확인");
    console.log(key);
    ;
    pool.getConnection(function (error,connection) {

        var sql="SELECT project.project_co,project.client_id,project.title,project.budget,project.count,project.end_day,project_category.big_category_co,project_category.small_category_co from project,project_category where project.project_co=project_category.project_co and project.client_id=?";


        connection.query(sql,[key],function (err, data) {

            if (err) console.error("err : " + err);

            console.log(data);
            // console.log(data);
            res.send(data);
            connection.release();
        });
    });

});


//TODO:프로젝트 상세 조회
// app.get('/read/:co',function (req,res,next) {
app.get('/read/:co',function (req,res,next) {

    // console.log(req.param('co'));

    var co = req.params.co;
    // console.log(co);
    var client = req.session.user_id;



    pool.getConnection(function(err,connection)
    {
        var sql1="select client_id from project where project_co=?";

        connection.query(sql1,co,function (err,data) {

            console.log(data);


            var search="select count(*) cnt from project where client_id=?"
            connection.query(search,data[0].client_id,function (err,data) {

                var cnt = data[0].cnt;

                console.log(cnt);

                var sql = "select client.client_id,client.ind,project.title,project.content from project,client where project.client_id=client.client_id and project_co=?";
                connection.query(sql,co, function(err,suc)
                {
                    if(err) console.error(err);

                    console.log(suc);

                    var data = {
                        "count":cnt,
                        "inform":suc
                    };
                    res.send(data);
                    connection.release();
                });
            });
        });
    });
});

//TODO:프로젝트 평가
app.get('/project-appraisal',function (req,res,next) {

    // var co = req.params.co;
    var co = 26;

    pool.getConnection(function(err,connection)
    {
        var sql="select partner_id from project_team where project_co=? and adopt_ck=0";

        connection.query(sql,co, function(err,data)
        {
            if(err) console.error(err);

            var key=data;

            var sql2="select client_id from project where project_co=?";

            connection.query(sql2,co,function (err,data) {
                if(err) console.error(err);

                var sql3="select client_id,ind from client where client_id=?"

                connection.query(sql3,data[0].client_id,function (err,suc) {
                    if(err) console.error(err);


                    var sql4="select count(*) cnt from project where client_id=? and state_co=1";
                    connection.query(sql4,data[0].client_id,function (err,kkk) {


                        var sql5="select count(*) cnt from project where client_id=? and state_co=1";

                        connection.query(sql5,data[0].client_id,function (err,sss) {
                            // console.log(data[0].client_id);
                            // console.log(key);
                            // console.log(suc);
                            // console.log(kkk);
                            // console.log(sss);
                            var subindata= {"parner_id" :key,
                                "client_inform":suc,
                                "end_project":kkk,
                                "ing_project":sss
                            };
                            console.log(subindata);

                        });
                    });
                });
            });
        });
    });
});

//TODO: 회원가입
app.post('/addUser',function (req,res,next) {

    var cp =req.body.type;
    var id = req.body.id;//아이디
    var password=req.body.password;//비밀번호
    var email = req.body.email;//이메일
    var pic ="subin.jpg";
    var introduce=req.body.introduce;//소개
    var name = req.body.name;//이름
    var sex = req.body.sex;//성별
    var birth=req.body.birth;//생년월일
    var licalAddress = req.body.lacalAddress;//큰주소
    var  etcAddress= req.body. etcAddress;//작은주소
    var address=licalAddress+etcAddress;//큰주소+작은주소
    var mobile="0516350643";
    var phone = req.body.phone;//폰번호
    var fax = req.body.fax;//팩스
    var account_bank=req.body.bank;//은행이름
    var account_name=req.body.name;//예금주
    var account=req.body.bankNumber;//계좌번호
    var identify="subinidenti.jpg";

    var datas = [id, password, email, pic, introduce, name, sex, birth, address, mobile, phone, fax, account_bank, account_name, account, identify];

    if (cp == 0) {

        pool.getConnection(function (err, connection) {

            var sql = "select client_id from client where client_id=?";

            connection.query(sql, [id], function (err, data) {

                if (id != data.client_id) {

                    var Insertdata = "insert into client(client_id,pw,em,pic,ind,name,sex,birth,addr,mobile_no,phone_no,fax_no,bank_name,depositor_name,account_no,iden_confirm_file) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

                    connection.query(Insertdata, datas, function (err, rows) {

                        if (err) {
                            console.error("err : " + err);
                            res.send("ERROR");
                        }

                        else {

                            console.log("rows:" + JSON.stringify(rows));

                            res.send("SUCCESS");
                            connection.release();
                        }
                    });
                }

                else if (id == data.client_id) {
                    res.send("FAIL");
                }
            });
        });
    }

    else {

        console.log("뭐꼬씨바꺼");
        pool.getConnection(function (err, connection) {

            var sql = "select partner_id from partner where partner_id=?";

            connection.query(sql, [id], function (err, data) {

                if (id != data.partner_id) {

                    var Insertdata = "insert into partner(partner_id,pw,em,pic,ind,name,sex,birth,addr,mobile_no,phone_no,fax_no,bank_name,depositor_name,account_no,iden_confirm_file) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

                    connection.query(Insertdata, datas, function (err, rows) {

                        console.log(rows);
                        if (err) {
                            console.error("err : " + err);
                            res.send("ERROR");
                        }

                        else {

                            console.log("rows:" + JSON.stringify(rows));

                            res.send("SUCCESS");
                            connection.release();
                        }
                    });
                }

                else if (id == data.partner_id) {
                    res.send("FAIL");
                }
            });
        });
    }
});


//TODO:프로젝트 등록
app.post('/project_registeration',function (req,res,next) {
    console.log(req.session.user_id );
    console.log(req.body);

    var key;
    var client=req.session.user_id;
    var state_co=1;
    var bigCategory=req.body.bigCategory;
    var smallCategory=req.body.smallCategory;
    var title=req.body.projectTitle;
    var projectComplet=req.body.projectComplet;
    var possibleMoney=req.body.possibleMoney;
    var manCount=req.body.manCount;
    var skill=req.body.skill;
    var planFile=req.body.planFile;
    var endDay=req.body.endDay;
    var foreStart=req.body.foreStart;
    var intro = req.body.intro;


    var datas = [client,state_co,title,projectComplet,possibleMoney,foreStart,intro,planFile,manCount,endDay];

    pool.getConnection(function (err, connection)
    {
        var sql= "insert into project(client_id,state_co,title,period,budget,project_start_date,content,file,count,end_day)values(?,?,?,?,?,?,?,?,?,?)";

        connection.query(sql,datas, function (err, data) {

            if (err) console.error("err : " + err);

            key=data.insertId;

            var datas2 = [data.insertId,client,bigCategory,smallCategory];

            var sql2="insert into project_category(project_co,client_id,big_category_co,small_category_co) values(?,?,?,?)";

            connection.query(sql2,datas2,function (err,data) {

                if (err) console.error("err : " + err);


                var datas3 = [key,skill,client];

                console.log(datas3);

                var sql3="insert into project_hold_skill(project_co,skill_co,client_id) values(?,?,?)";

                connection.query(sql3,datas3,function (err,data) {

                    if (err) console.error("err : " + err);
                    console.log(data);
                    res.end("하이허이");
                    connection.release();
                });
            });
        });
    });
});



//TODO:로그인
app.post('/Login' ,function (req,res,next) {

    console.log("야호");
    var user = {
        id:req.body.id,
        password:req.body.password
    };



    pool.getConnection(function (err,connection) {

        var query = "select client_id,pw from client where client_id=?";

        connection.query(query,[user.id],function (err,result) {

            console.log("씨빠");
            console.log("result : " + JSON.stringify(result));


            for(key in result) {

                var db = {
                    key_id :result[key].client_id ,
                    key_password : result[key].pw

                }

            }

            if(result===undefined)
            {

                console.log("파트너로들어옴");
                pool.getConnection(function (err,connection) {
                    console.log("캬컄캬캬캬");
                    var query = "select partner_id,pw from partner where partner_id=?";

                    connection.query(query,[user.id],function (err,result) {

                        console.log("result : " + JSON.stringify(result));

                        for (key in result) {

                            var db = {
                                key_id: result[key].partner_id,
                                key_password: result[key].pw
                            }
                            console.log(db);
                        }

                        if(result==undefined)
                        {

                            console.log("니미럴1");
                            res.send("아이디가 존재하지 않습니다.");
                        }

                        else if(user.password===db.key_password&&user.id===db.key_id)
                        {
                            console.log("니미럴2");
                            req.session.user_id = user.id;


                            res.cookie('id',req.session.user_id);

                            res.send("아이디와 패스워드가 일치합니다");

                        }

                        else if (user.password===db.key_password||user.id===db.key_id)
                        {
                            console.log("니미럴3");
                            res.send("아이디와 패스워드를 다시한번 확인하세요.");

                        }
                    });
                });
            }

            else if(user.password===db.key_password&&user.id===db.key_id)
            {

                req.session.user_id = user.id;

                res.cookie('id',req.session.user_id);

                res.send("아이디와 패스워드가 일치합니다.");

            }

            else if (user.password===db.key_password||user.id===db.key_id)
            {

                res.send("아이디와 패스워드를 다시한번 확인하세요.");

            }

        });

    });
});

//TODO:로그아웃
app.get('/Logout',function (req,res,next) {
    req.session.destroy();
    res.clearCookie('id');
    res.end("asdasd");
});



//TODO:검색기능
app.get('/DataSearch/:type/:keywords', function (req,res,next) {


    var option = req.params.type;
    var searchdata = req.params.keywords;

    console.log(option);
    console.log(searchdata);

    var a=2;
    var searchdata2="%"+searchdata+"%";

    if(option=="client_id"){

        pool.getConnection(function(err,connection)
        {
            if(err) console.error("에러 : ",err);

            var sql="select project.project_co,project.client_id,project.title,project.budget,project.count,project.end_day,project_category.big_category_co,project_category.small_category_co from project,project_category where state_co=2 and project.project_co=project_category.project_co and project.client_id like ?";


            connection.query(sql, [searchdata2], function(err,data)
            {
                if(err) console.error(err);
                console.log("검색 결과 확인 : ",data);
                res.send(data);
                connection.release();
            });
        });


    }

    else if(option=="title"){

        console.log("title들어옴");

        pool.getConnection(function (error,connection) {

            var sql2="SELECT project.project_co,project.client_id,project.title,project.budget,project.count,project.end_day,project_category.big_category_co,project_category.small_category_co from project,project_category where state_co=2 and project.project_co=project_category.project_co and project.title like ?";

            connection.query(sql2,[searchdata2],function (err, data) {

                if (err) console.error("err : " + err);

                console.log(data);
                // console.log(data);
                res.send(data);
                connection.release();
            });
        });

    }
});
