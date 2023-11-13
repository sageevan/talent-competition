using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Talent.Common.Aws;
using Talent.Common.Contracts;

namespace Talent.Common.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _tempFolder;
        private IAwsService _awsService;
        private IFileService _fileService;


        public FileService(IHostingEnvironment environment, 
            IAwsService awsService)
        {
            _environment = environment;
            _tempFolder = "\\images\\";
            _awsService = awsService;
        }

        public async Task<string> GetFileURL(string fileName, FileType type)
        {
            //Your code here;
            // throw new NotImplementedException();

            string pathWeb = "";

            string pathValue = "";
            var path = "";

            if (string.IsNullOrWhiteSpace(_environment.WebRootPath))
            {
                _environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "");
            }

            pathWeb = _environment.WebRootPath;

            if (fileName != "" && type == FileType.ProfilePhoto && pathWeb != "")
            {

                pathValue = pathWeb + _tempFolder;
                path = pathValue + fileName;

                Console.WriteLine("get url "+ path);
            }
            return path;

        }

        public async Task<string> SaveFile(IFormFile file, FileType type)
        {
            //Your code here;
            // unique file name
            var myUniqueFileName = "";
            string pathWeb = "";
            if (string.IsNullOrWhiteSpace(_environment.WebRootPath))
            {
                _environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "");
            }
            pathWeb = _environment.WebRootPath;
            //Console.WriteLine(pathWeb);

            if (file != null && type == FileType.ProfilePhoto && pathWeb != "")
            {
                string pathValue = pathWeb + _tempFolder;
                myUniqueFileName = $@"{DateTime.Now.Ticks}_" + file.FileName;
                var path = pathValue + myUniqueFileName;
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
               // Console.WriteLine(path);
            }
            return myUniqueFileName;
        }

        public async Task<bool> DeleteFile(string fileName, FileType type)
        {
            var myUniqueFileName = "";
            string pathWeb = "";
            if (string.IsNullOrWhiteSpace(_environment.WebRootPath))
            {
                _environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "");
            }
            pathWeb = _environment.WebRootPath;
            //Console.WriteLine(pathWeb);

            if (fileName != null && type == FileType.ProfilePhoto && pathWeb != "")
            {
                string pathValue = pathWeb + _tempFolder;
                //myUniqueFileName = $@"{DateTime.Now.Ticks}_" + fileName;
                var path = pathValue + fileName;
                Console.WriteLine(path);
                //using (var fileStream = new FileStream(path, FileMode.Truncate))
                //{
                File.SetAttributes(path, FileAttributes.Normal);
                File.Delete(path);
                    //await file.CopyToAsync(fileStream);
                //}
                // Console.WriteLine(path);
            }
            return true;
        }


        #region Document Save Methods

        private async Task<string> SaveFileGeneral(IFormFile file, string bucket, string folder, bool isPublic)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        
        private async Task<bool> DeleteFileGeneral(string id, string bucket)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        #endregion
    }
}
