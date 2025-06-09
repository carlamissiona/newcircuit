
// Import database functions for future use
const { getUserByEmailDB, getSearchedchannels , postUserfriends, createUserDB, getUserSubsByEmail, postUsersubs, postMicro } = require('../db');


const root = "https://3001-carlamission-newcircuit-d8ou6v00znw.ws-eu120.gitpod.io/";


// Show dashboard page
const showDashboard = (req, res) => {
  // Dashboard data for the authenticated user
  const dashboardData = {
    stats: {
      projects: 12,
      tasks: 48,
      completed: 32,
      pending: 16
    },
    recentActivity: [
      { action: 'Completed task', item: 'Design homepage', time: '2 hours ago' },
      { action: 'Added new task', item: 'Implement login page', time: '4 hours ago' },
      { action: 'Updated project', item: 'Client website redesign', time: '1 day ago' },
      { action: 'Joined project', item: 'Mobile app development', time: '3 days ago' }
    ]
  };

  res.render('dashboard', {
    title: 'Dashboard',
    user: req.user,
    data: dashboardData
  });
};


const rendrHome = async (req, res) => {

  // getUserSubsByEmailDB
  let subs = null; let artcls = [];
  let email = req.user; console.log(email);
  let user = await getUserSubsByEmail(email).then((value)=>{
    //  console.log("dahsboarc controller @@gerSubsByEmail");
    console.log(value);
    
    for (let i = 0; i < value.length; i++) {
        let { title } = JSON.parse(value[i].nc_details_article) ;
        artcls.push( JSON.parse(value[i].nc_details_article) );
        console.log("title=++++", title );
    }

     
     console.log( "How To Parse the Object article \n title:" );
     console.log(   (JSON.parse(value[0].nc_details_article)).title );
     subs = value;


  });

  console.log("user subs==");
  

  res.render('home', { title: 'Express Auth App' , useremail:req.user ,  userinfo: req.userinfo, subitems: artcls });
};
 

const post_microblog = async (req, res) => {
      
    console.log("POSTING POSTING ");console.log("POSTING POSTING "); 
    const { message } = req.body; 

    if (!message) {
      res.redirect('/app?error=Complete your posts. All fields required.');
    } 
    let user = null;
    const userob = await getUserByEmailDB(req.user).then((vl)=>{
          console.log("email == @getUserByEmailDB ");
          user = vl.id;
    });
    
  
    try {
      const postingblog = await postMicro({ message,  user }).then((vl)=>{
           console.log(postingblog);  console.log("<== blogging");
           res.redirect('/app?message=You have successfully posted a blog');
      });

      res.redirect('home');
    } catch (error) {

      console.log("Error!!" , error ); 
      res.redirect('/app?error=Server error');
    }
     
};
 
// End post micro


const render_microblog = async (req, res) => {

  // get micro blog and render profile
 
  
  user = await getUserSubsByEmail(req.email);
  console.log("user subs ===");
  console.log(user);
  if (!user || user == null) {
    return res.render('auth/login', {
      title: 'Login',
      error: 'Invalid email or password',
      email
    });
  }

 
  res.render('home', { title: 'Express Auth App', user:req.user });
};
 

const get_search = async (req, res) => {

  // get micro blog and render profile
 

  res.render('search', { title: 'Get Search', user:req.user } );
};

const post_result = async (req, res) => {

  let subs = null; let results = []; 
  let user = await getSearchedchannels(email).then((value)=>{
    //  console.log("dahsboarc controller @@gerSubsByEmail");
    console.log(value);
    
    for (let i = 0; i < value.length; i++) {
        let { title } = JSON.parse(value[i].nc_details_article) ;
        artcls.push( JSON.parse(value[i].nc_details_article) );
        console.log("title=++++", title );
    }

     
     console.log( "How To Parse the Object article \n title:" );
     console.log(   (JSON.parse(value[0].nc_details_article)).title );
     subs = value;


  });
 
  
  res.render('get_search', { title: 'Get Search', user:req.user } );
};

const get_frsearch = async (req, res) => {

  // get micro blog and render profile
 

  res.render('friends_search', { title: 'Get Search', user:req.user } );
};
const post_subs = async (req, res) => {
    let email = req.user;
    const { channel_email } = req.body; 
    let val = null;
    const channel = await getUserByEmailDB(channel_email).then((vl)=>{
          console.log("email == @post_subs ");
          console.log(vl.id);
          val = vl.id;
          // check here when the vl.id is undefined it means no email on db
    });

    if (!channel_email) {
      res.redirect('/app?error= Server error.Subscribing failed.');
    } 
 

    try {
      const usersub = await postUsersubs({ email , val }).then((vl)=>{
          console.log("email == @postUsersubs ");
          console.log(vl);

          res.redirect('/search?messsage=Successfully subscribe!');
      });
     
    } catch (error) {

      console.log("Error!! usersub" , error ); 
      res.redirect('/app?error=Server error');

    }

  res.render('search', { title: 'Get Search', user:req.user } );

}; // end post subs


const post_friends = async (req, res) => {

    let email = req.user;
    const { fremail } = req.body; 
    let val = null;

    console.log("fremail");
    console.log(fremail);
   
    const channel = await getUserByEmailDB(fremail).then( async (vl)=>{

          val = vl.id;
          // check here when the vl.id is undefined it means no email on db
          
          try {
            
              const userfr = await postUserfriends({ fremail , val }).then((vl)=>{
              console.log("email == @postUsersubs value is undefined ");
              console.log(vl);
   
              res.redirect('/search?messsage=Successfully subscribed!');
            });
          
          } catch (error) {

            console.log("Error!! usersub" , error ); 
            res.redirect('/app?error=Server error');

          }
     });

    if (!fremail) {
      res.redirect('/app?error= Server error. Subscribing failed.');
    } 
 
 

    res.render('search', { title: 'Get Search', user:req.user } );

}; // end post subs


module.exports = {
  showDashboard,
  rendrHome,
  post_microblog,
  get_search,
  post_subs,
  get_frsearch,
  post_friends,

};