
// Import database functions for future use
const { getUserByEmailDB, createUserDB, getUserSubsByEmail, postMicro } = require('../db');




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
  let subs = null;
  let email = req.user; console.log(email);
  let user = await getUserSubsByEmail(email).then((value)=>{
    //  console.log("dahsboarc controller @@gerSubsByEmail");
    console.log(value);
    let artcls = [];
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
  

  res.render('home', { title: 'Express Auth App', useremail:req.user ,  userinfo: req.userinfo, subitems: subs });
};
 

const post_microblog = async (req, res) => {
      
    console.log("POSTING POSTING ");console.log("POSTING POSTING "); 
    const { message } = req.body; 

    if (!message) {
      res.redirect('/home?error=Complete your posts. All fields required.');
    } 
    let user = null;
    const userob = await getUserByEmailDB(req.user).then((vl)=>{
          console.log("email == @getUserByEmailDB ");
          user = vl.id;
    });
    
  
    try {
      const postingblog = await postMicro({ message,  user }).then((vl)=>{
           console.log(postingblog);  console.log("<== blogging");
           res.redirect('/home?message=You have successfully posted a blog');
      });

      res.redirect('home');
    } catch (error) {

      console.log("Error!!" , error ); 
      res.redirect('/home?error=Server error');
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
 

module.exports = {
  showDashboard,
  rendrHome,
  post_microblog,
    
};