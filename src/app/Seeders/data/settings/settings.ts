import SettingModel from "../../../Models/Setting";



enum Styles{STYLE_1=1,STYLE_2, STYLE_3};

const settings = {
    landingPageConfig:{
        navStyle:Styles.STYLE_1,
        sliderStyle:Styles.STYLE_1,
        aboutStyle:Styles.STYLE_1,
        testimonialStyle:Styles.STYLE_1,
        ourBenefitStyle:Styles.STYLE_2,
        whatWeOfferStyle:Styles.STYLE_1
    },
    dashboardConfig:{
        layoutOptions: {
        typography: "poppins",
        version: "light",
        layout: "vertical",
        headerBg: "color_4",
        primary: "color_4",
        navheaderBg: "color_4",
        sidebarBg: "color_1",
        sidebarStyle: "full",
        sidebarPosition: "fixed",
        headerPosition: "fixed",
        containerLayout: "full",
        direction: 'ltr'

        }
    },
    companyDetails:{
        siteName:"PayBuddie",
        logo:"",
        logoDark:"",
        favicon:"",
        city:"",
        state:"",
        country:"",
        zip:"",
        description:"Some brief description here about the company would do!",
        email:["paybuddie@support.com"],
        contact:['08155393750'],
        address:"14 Etta Agbor Road Calabar, CRS",
        activeHours:"Mon - Fri: 7:00am - 6:00pm  Saturday: 9:00am - 5:00pm  Sunday: Closed",
        facebookHandle:"https://www.facebook.com/paybuddie",
        twitterHandle:"https://www.twitter.com/paybuddie",
        instagram:"https://www.instagram.com/paybuddie",
        whatsapp:"https://www.whatsapp.com/paybuddie"
    },
    pages:{
        aboutUs:"",
        privacyPolicy:"",
        termsCondition:""
    }
}

const settingsSeed = async()=>{
      var update ={expire:new Date()},
      options ={upsert:true,new:true,setDefaultOnInsert:true};

              const createSettings = await SettingModel.findOneAndUpdate({
        ...settings
    },update,options)

    
}

export default settingsSeed;