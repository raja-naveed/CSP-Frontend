import { message } from "antd";
export const BASEURL = "https://alfawzbackend.vercel.app"

export const authRequest = "auth";
export const volunteerUpdate = "volunteer/updateVolunteer/";
export const ngoUpdate = "ngo/updateNgo/";
export const defaultAccountImage = "/assets/images/ngo-dp.png";
export const getNgoById = "ngo/getById/";

export const admin = {
    login : "admin/login",
    inActiveNgo : "admin/inActiveNgo",
    inActiveNgoVolunteer : "admin/inActiveVolunteer",
    inActiveProjects:"admin/inActiveProjects",
    activeNgos : "admin/activeNgo",
    activeVolunteer : "admin/activeVolunteer",
    deleteNgo : "admin/deleteNgo/",
    updateNgo : "admin/updateNgo",
    deleteVolunteer : "admin/deleteVolunteer/",
    updateVolunteer : "admin/updateVolunteer",
    count : "admin/count",
    latestRequests : "admin/latestRequests",
    disableUser : "admin/disableUser" ,
    about : "admin/about",
    updateCategory :"admin/updateCategory",
    deleteCategory :"admin/deleteCategory",
    updateMission : "admin/updateMission",
    sliderImages : "admin/sliderImages",
    getSlider : "admin/getSlider" 

}
export const ngo = {
    login : "ngo/login",
    getVolNgoProjects  : "ngo/getVolNgoProjects",
    register:"ngo/register",
    amountDonate: "ngo/amountDonate/",
    getAll :"ngo/getAll",
    serviceCategory:"ngo/serviceCategory"
}
export const volunteer = {
    login : "volunteer/login",
    register :"volunteer/register",
    collectPoints : "volunteer/collectPoints/"
}
export const projectApis = {
    createProject: "project/create",
    getProjectsByNgoId : "project/getByNgoId",
    deleteProject : "project/deleteProject/",
    updateProject : "project/updateProject",
    getAll : "project/getAll",
    addVol: "project/addVol/",
    getAllExcept : "project/getAllExcept",
    getByVolId : "project/getByVol",
    done : "project/done" ,
    getAllAfterNow : "project/getAllAfterNow",
    getAllVol : "project/getAllVol",
    rating : "project/rating",
    getRating : "project/getRating",
};
export const reward = {
    rewardRequest : "reward/request",
    certificateRequest:"reward/certificateRequest",
    uploadCertificate : "reward/uploadCertificate",
    pointsRequest:"reward/pointsRequest",
    rejectRequest :"reward/rejectRequest",
    grant : "reward/grant/",
    getCertificate : "reward/getCertificate"
}
export const backToDashboard = () => moveTo();
export const moveTo = (where) => { window.location.href =  `/${where}` };

export const logout = async () => {
    try {
        const res = await fetch(BASEURL + "logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (res.ok || res.status === 200) {
            message.success("Logout Successfully");
            window.localStorage.setItem("permission", JSON.stringify(false));
            moveTo("");
        }
        else {
            message.error("Logout Later");
            alert("Logout Later");
        }
    }
    catch (error) {
        console.log(error);
    }
};