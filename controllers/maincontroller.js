//Function to display the about page of the website
exports.about = (req,res)=> {
    res.render('about');
};
//Function to display the contact page of the website
exports.contact = (req,res)=> {
    res.render('contact');
};
//Function to display the homepage website
exports.homepage = (req,res) => {
    res.render('index');
};
