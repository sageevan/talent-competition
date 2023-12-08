using Talent.Common.Contracts;
using Talent.Common.Models;
using Talent.Services.Profile.Domain.Contracts;
using Talent.Services.Profile.Models.Profile;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Bson;
using Talent.Services.Profile.Models;
using Microsoft.AspNetCore.Http;
using System.IO;
using Talent.Common.Security;
using System.Data;
using StackExchange.Redis;

namespace Talent.Services.Profile.Domain.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IUserAppContext _userAppContext;
        IRepository<UserLanguage> _userLanguageRepository;
        IRepository<User> _userRepository;
        IRepository<Employer> _employerRepository;
        IRepository<Job> _jobRepository;
        IRepository<Recruiter> _recruiterRepository;
        IFileService _fileService;


        public ProfileService(IUserAppContext userAppContext,
                              IRepository<UserLanguage> userLanguageRepository,
                              IRepository<User> userRepository,
                              IRepository<Employer> employerRepository,
                              IRepository<Job> jobRepository,
                              IRepository<Recruiter> recruiterRepository,
                              IFileService fileService)
        {
            _userAppContext = userAppContext;
            _userLanguageRepository = userLanguageRepository;
            _userRepository = userRepository;
            _employerRepository = employerRepository;
            _jobRepository = jobRepository;
            _recruiterRepository = recruiterRepository;
            _fileService = fileService;
        }

        public async Task<bool> AddNewExperience(AddExperienceViewModel experience, String userId)
        {
            try
            {

                var newexperience = new UserExperience
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    Position = experience.Position,
                    Responsibilities = experience.Responsibilities,
                    Company = experience.Company,
                    Start = experience.Start,
                    End = experience.End,
                };

                var user = await _userRepository.GetByIdAsync(userId);
                user.Experience.Add(newexperience);
                await _userRepository.Update(user);
                return true;
            }
            catch (MongoException e)
            {
                return false;
            }
        }
        public async Task<bool> UpdateExperience(AddExperienceViewModel experience, String userId)
        {
            try
            {
                var updateexperience = new UserExperience
                {
                    Id = experience.Id,
                    Position = experience.Position,
                    Company = experience.Company,
                    Responsibilities = experience.Responsibilities,
                    Start = experience.Start,
                    End = experience.End,
                };

                var user = await _userRepository.GetByIdAsync(userId);
                UserExperience updateExperience = user.Experience.Where(x => x.Id == updateexperience.Id).FirstOrDefault();
                user.Experience.Remove(updateExperience);
                user.Experience.Add(updateexperience);
                await _userRepository.Update(user);
                return true;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> DeleteExperience(AddExperienceViewModel experience, String userId)
        {
            try
            {

                var deleteExperience = new UserExperience
                {
                    Id = experience.Id,
                };

                var user = await _userRepository.GetByIdAsync(userId);
                UserExperience deleteexperience = user.Experience.Where(x => x.Id == experience.Id).FirstOrDefault();
                user.Experience.Remove(deleteexperience);
                await _userRepository.Update(user);
                return true;
            }
            catch (MongoException e)
            {
                return false;
            }
        }


        public async Task<bool> AddNewLanguage(AddLanguageViewModel language, String userId)
        {
            try
            {

                var newlanguage = new UserLanguage
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    LanguageLevel = language.Level,
                    Language = language.Name,
                    UserId = userId,
                    IsDeleted = false
                };

                var user = await _userRepository.GetByIdAsync(userId);
                user.Languages.Add(newlanguage);
                await _userRepository.Update(user);
                return true;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> DeleteLanguage(AddLanguageViewModel language, String userId)
        {
            try
            {

                var deletelanguage = new UserLanguage
                {
                    Id = language.Id,
                };

                var user = await _userRepository.GetByIdAsync(userId);
                UserLanguage deleteLanguage = user.Languages.Where(x => x.Id == deletelanguage.Id).FirstOrDefault();
                user.Languages.Remove(deleteLanguage);
                await _userRepository.Update(user);
                return true;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> UpdateLanguage(AddLanguageViewModel language, String userId)
        {
            try
            {
                var updatelanguage = new UserLanguage
                {
                    Id = language.Id,
                    LanguageLevel = language.Level,
                    Language = language.Name,
                    UserId = userId,
                    IsDeleted = false
                };

                var user = await _userRepository.GetByIdAsync(userId);
                UserLanguage updateLanguage = user.Languages.Where(x => x.Id == updatelanguage.Id).FirstOrDefault();
                user.Languages.Remove(updateLanguage);
                user.Languages.Add(updatelanguage);
                await _userRepository.Update(user);
                return true;
            }
            catch (MongoException e)
            {
                return false;
            }
        }


        public async Task<bool> AddNewSkill(AddSkillViewModel skill, String userId)
        {
            try
            {

                var newskill = new UserSkill
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    ExperienceLevel = skill.Level,
                    Skill = skill.Name,
                    UserId = userId,
                    IsDeleted = false
                };

                var user = await _userRepository.GetByIdAsync(userId);
                user.Skills.Add(newskill);
                await _userRepository.Update(user);
                return true;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> DeleteSkill(AddSkillViewModel skill, String userId)
        {
            try
            {

                var deleteSkill = new UserSkill
                {
                    Id = skill.Id,
                };

                var user = await _userRepository.GetByIdAsync(userId);
                UserSkill deleteskill = user.Skills.Where(x => x.Id == deleteSkill.Id).FirstOrDefault();
                user.Skills.Remove(deleteskill);
                await _userRepository.Update(user);
                return true;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> UpdateSkill(AddSkillViewModel skill, String userId)
        {
            try
            {
                var updateskill = new UserSkill
                {
                    Id = skill.Id,
                    ExperienceLevel = skill.Level,
                    Skill = skill.Name,
                    UserId = userId,
                    IsDeleted = false
                };

                var user = await _userRepository.GetByIdAsync(userId);
                UserSkill updateSkill = user.Skills.Where(x => x.Id == updateskill.Id).FirstOrDefault();
                user.Skills.Remove(updateSkill);
                user.Skills.Add(updateskill);
                await _userRepository.Update(user);
                return true;
            }
            catch (MongoException e)
            {
                return false;
            }
        }


        public async Task<TalentProfileViewModel> GetTalentProfile(string Id)
        {
            //Your code here;
            User profile = null;
            profile = (await _userRepository.GetByIdAsync(Id));

            var videoUrl = "";
            var cvUrl = "";
            var photoUrl = "";
            if (profile != null)
            {
                //photoUrl = string.IsNullOrWhiteSpace(profile.ProfilePhoto)
                //          ? ""
                //          : await _fileService.GetFileURL(profile.ProfilePhoto, FileType.ProfilePhoto);
                videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                          ? ""
                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);
                cvUrl = string.IsNullOrWhiteSpace(profile.CvName)
                          ? ""
                          : await _fileService.GetFileURL(profile.CvName, FileType.UserCV);

                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();
                var languages = profile.Languages.Select(x => ViewModelFromLanguage(x)).ToList();
                var experience = profile.Experience.Select(x => ViewModelFromExperience(x)).ToList();
                var result = new TalentProfileViewModel
                {
                    Id = profile.Id,
                    FirstName = profile.FirstName,
                    MiddleName = profile.MiddleName,
                    LastName = profile.LastName,
                    Gender = profile.Gender,
                    Email = profile.Email,
                    Phone = profile.Phone,
                    MobilePhone = profile.MobilePhone,
                    IsMobilePhoneVerified = profile.IsMobilePhoneVerified,
                    Address = profile.Address,
                    Nationality = profile.Nationality,
                    VisaStatus = profile.VisaStatus,
                    VisaExpiryDate = profile.VisaExpiryDate,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,
                    CvName = profile.CvName,
                    CvUrl = cvUrl,
                    Summary = profile.Summary,
                    Description = profile.Description,
                    LinkedAccounts = profile.LinkedAccounts,
                    JobSeekingStatus = profile.JobSeekingStatus,
                    Languages = languages,
                    Skills = skills,
                    Experience = experience,
                };
                return result;
            }

            return null;
        }


        public async Task<bool> UpdateTalentProfile(TalentProfileViewModel model, string updaterId)
        {
            var status = new JobSeekingStatus();
            status.Status = model.JobSeekingStatus.Status;
            status.AvailableDate = null;
            try
            {
                if (model.Id != null)
                {

                    User existingUser = (await _userRepository.GetByIdAsync(model.Id));
                    existingUser.FirstName = model.FirstName;
                    existingUser.LastName = model.LastName;
                    existingUser.Email = model.Email;
                    existingUser.Phone = model.Phone;
                    existingUser.JobSeekingStatus = status;
                    existingUser.LinkedAccounts = model.LinkedAccounts;

                    existingUser.Address = model.Address;
                    existingUser.Description = model.Description;
                    existingUser.Summary = model.Summary;

                    existingUser.Nationality = model.Nationality;
                    existingUser.VisaStatus = model.VisaStatus;
                    existingUser.VisaExpiryDate = model.VisaExpiryDate;

                    existingUser.UpdatedBy = updaterId;
                    existingUser.UpdatedOn = DateTime.Now;





                    await _userRepository.Update(existingUser);
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<EmployerProfileViewModel> GetEmployerProfile(string Id, string role)
        {

            Employer profile = null;
            switch (role)
            {
                case "employer":
                    profile = (await _employerRepository.GetByIdAsync(Id));
                    break;
                case "recruiter":
                    profile = (await _recruiterRepository.GetByIdAsync(Id));
                    break;
            }

            var videoUrl = "";

            if (profile != null)
            {
                videoUrl = string.IsNullOrWhiteSpace(profile.VideoName)
                          ? ""
                          : await _fileService.GetFileURL(profile.VideoName, FileType.UserVideo);

                var skills = profile.Skills.Select(x => ViewModelFromSkill(x)).ToList();

                var result = new EmployerProfileViewModel
                {
                    Id = profile.Id,
                    CompanyContact = profile.CompanyContact,
                    PrimaryContact = profile.PrimaryContact,
                    Skills = skills,
                    ProfilePhoto = profile.ProfilePhoto,
                    ProfilePhotoUrl = profile.ProfilePhotoUrl,
                    VideoName = profile.VideoName,
                    VideoUrl = videoUrl,
                    DisplayProfile = profile.DisplayProfile,
                };
                return result;
            }

            return null;
        }

        public async Task<bool> UpdateEmployerProfile(EmployerProfileViewModel employer, string updaterId, string role)
        {
            try
            {
                if (employer.Id != null)
                {
                    switch (role)
                    {
                        case "employer":
                            Employer existingEmployer = (await _employerRepository.GetByIdAsync(employer.Id));
                            existingEmployer.CompanyContact = employer.CompanyContact;
                            existingEmployer.PrimaryContact = employer.PrimaryContact;
                            existingEmployer.ProfilePhoto = employer.ProfilePhoto;
                            existingEmployer.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingEmployer.DisplayProfile = employer.DisplayProfile;
                            existingEmployer.UpdatedBy = updaterId;
                            existingEmployer.UpdatedOn = DateTime.Now;

                            var newSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingEmployer.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newSkills.Add(skill);
                            }
                            existingEmployer.Skills = newSkills;

                            await _employerRepository.Update(existingEmployer);
                            break;

                        case "recruiter":
                            Recruiter existingRecruiter = (await _recruiterRepository.GetByIdAsync(employer.Id));
                            existingRecruiter.CompanyContact = employer.CompanyContact;
                            existingRecruiter.PrimaryContact = employer.PrimaryContact;
                            existingRecruiter.ProfilePhoto = employer.ProfilePhoto;
                            existingRecruiter.ProfilePhotoUrl = employer.ProfilePhotoUrl;
                            existingRecruiter.DisplayProfile = employer.DisplayProfile;
                            existingRecruiter.UpdatedBy = updaterId;
                            existingRecruiter.UpdatedOn = DateTime.Now;

                            var newRSkills = new List<UserSkill>();
                            foreach (var item in employer.Skills)
                            {
                                var skill = existingRecruiter.Skills.SingleOrDefault(x => x.Id == item.Id);
                                if (skill == null)
                                {
                                    skill = new UserSkill
                                    {
                                        Id = ObjectId.GenerateNewId().ToString(),
                                        IsDeleted = false
                                    };
                                }
                                UpdateSkillFromView(item, skill);
                                newRSkills.Add(skill);
                            }
                            existingRecruiter.Skills = newRSkills;
                            await _recruiterRepository.Update(existingRecruiter);

                            break;
                    }
                    return true;
                }
                return false;
            }
            catch (MongoException e)
            {
                return false;
            }
        }

        public async Task<bool> UpdateEmployerPhoto(string employerId, IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };

            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
            {
                return false;
            }

            var profile = (await _employerRepository.Get(x => x.Id == employerId)).SingleOrDefault();

            if (profile == null)
            {
                return false;
            }

            var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);

            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = profile.ProfilePhoto;

                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }

                profile.ProfilePhoto = newFileName;
                profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);

                await _employerRepository.Update(profile);
                return true;
            }

            return false;

        }

        public async Task<bool> AddEmployerVideo(string employerId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentPhoto(string talentId, IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            List<string> acceptedExtensions = new List<string> { ".jpg", ".png", ".gif", ".jpeg" };
            //Console.WriteLine(fileExtension + " " + file.FileName);
            if (fileExtension != null && !acceptedExtensions.Contains(fileExtension.ToLower()))
            {
                return false;
            }

            var profile = (await _userRepository.Get(x => x.Id == talentId)).SingleOrDefault();

            if (profile == null)
            {
                return false;
            }
            var newFileName = await _fileService.SaveFile(file, FileType.ProfilePhoto);
            if (!string.IsNullOrWhiteSpace(newFileName))
            {
                var oldFileName = profile.ProfilePhoto;
                Console.WriteLine(oldFileName);
                if (!string.IsNullOrWhiteSpace(oldFileName))
                {
                    await _fileService.DeleteFile(oldFileName, FileType.ProfilePhoto);
                }
                profile.ProfilePhotoUrl = await _fileService.GetFileURL(newFileName, FileType.ProfilePhoto);
                profile.ProfilePhoto = newFileName;
                await _userRepository.Update(profile);
                return true;
            }

            return false
                ;

        }

        public async Task<bool> AddTalentVideo(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<bool> RemoveTalentVideo(string talentId, string videoName)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateTalentCV(string talentId, IFormFile file)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<string>> GetTalentSuggestionIds(string employerOrJobId, bool forJob, int position, int increment)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(string employerOrJobId, bool forJob, int position, int increment)
        {
            try
            {
                var profile = await _employerRepository.GetByIdAsync(employerOrJobId);
                //var talentList = _userRepository.Collection.Skip(position).Take(increment).AsEnumerable();
                var talentList = _userRepository.GetQueryable().Skip(position).Take(increment);
                if (profile != null)
                {
                    var result = new List<TalentSnapshotViewModel>();

                    foreach (var item in talentList)
                    {
                        var newItem = new TalentSnapshotViewModel()
                        {
                            Id = item.Id,
                            Name = item.FirstName + ' ' + item.LastName,
                            Visa = item.VisaStatus,
                            PhotoId = item.ProfilePhotoUrl,
                            Skills = item.Skills.Select(x => x.Skill).ToList(),
                            VideoUrl = item.VideoName

                        };
                        result.Add(newItem);
                    }
                    return result;
                }
                return null;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        public async Task<IEnumerable<TalentSnapshotViewModel>> GetTalentSnapshotList(IEnumerable<string> ids)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #region TalentMatching

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetFullTalentList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public IEnumerable<TalentMatchingEmployerViewModel> GetEmployerList()
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentMatchingEmployerViewModel>> GetEmployerListByFilterAsync(SearchCompanyModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestionViewModel>> GetTalentListByFilterAsync(SearchTalentModel model)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<TalentSuggestion>> GetSuggestionList(string employerOrJobId, bool forJob, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<bool> AddTalentSuggestions(AddTalentSuggestionList selectedTalents)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        #endregion

        #region Conversion Methods

        #region Update from View

        protected void UpdateSkillFromView(AddSkillViewModel model, UserSkill original)
        {
            original.ExperienceLevel = model.Level;
            original.Skill = model.Name;
        }

        #endregion

        #region Build Views from Model

        protected AddSkillViewModel ViewModelFromSkill(UserSkill skill)
        {
            return new AddSkillViewModel
            {
                Id = skill.Id,
                Level = skill.ExperienceLevel,
                Name = skill.Skill
            };
        }
        protected AddLanguageViewModel ViewModelFromLanguage(UserLanguage language)
        {
            return new AddLanguageViewModel
            {
                Id = language.Id,
                Level = language.LanguageLevel,
                Name = language.Language,
            };
        }


        protected AddEducationViewModel ViewModelFromEducationl(UserEducation education)
        {
            return new AddEducationViewModel
            {
                Id = education.Id,
                Country = education.Country,
                Degree = education.Degree,
                InstituteName = education.InstituteName,
                Title = education.Title,
                YearOfGraduation = education.YearOfGraduation,
            };
        }


        protected AddCertificationViewModel ViewModelFromCertifications(UserCertification certification)
        {
            return new AddCertificationViewModel
            {
                Id = certification.Id,
                CertificationName = certification.CertificationName,
                CertificationFrom = certification.CertificationFrom,
                CertificationYear = certification.CertificationYear,
            };
        }

        protected ExperienceViewModel ViewModelFromExperience(UserExperience experience)
        {
            return new ExperienceViewModel
            {
                Id = experience.Id,
                Company = experience.Company,
                Position = experience.Position,
                Responsibilities = experience.Responsibilities,
                Start = experience.Start,
                End = experience.End,
            };
        }

        #endregion

        #endregion

        #region ManageClients

        public async Task<IEnumerable<ClientViewModel>> GetClientListAsync(string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<ClientViewModel> ConvertToClientsViewAsync(Client client, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();
        }

        public async Task<int> GetTotalTalentsForClient(string clientId, string recruiterId)
        {
            //Your code here;
            throw new NotImplementedException();

        }

        public async Task<Employer> GetEmployer(string employerId)
        {
            return await _employerRepository.GetByIdAsync(employerId);
        }
        #endregion

    }
}
