using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
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
            IAwsService awsService, IServer server)
        {
            _environment = environment;
            _tempFolder = "\\images\\";
            _awsService = awsService;
        }

        public async Task<string> GetFileURL(string fileName, FileType type)
        {

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

                Console.WriteLine("get url " + path);
            }
            return path;

        }

        public async Task<string> SaveFile(IFormFile file, FileType type)
        {
            var myUniqueFileName = "";
            string pathWeb = "";
            if (string.IsNullOrWhiteSpace(_environment.WebRootPath))
            {
                _environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "");
            }
            pathWeb = _environment.WebRootPath;

            if (file != null && type == FileType.ProfilePhoto && pathWeb != "")
            {
                string pathValue = pathWeb + _tempFolder;
                myUniqueFileName = $@"{DateTime.Now.Ticks}_" + file.FileName;
                var path = pathValue + myUniqueFileName;
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
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

            if (fileName != null && type == FileType.ProfilePhoto && pathWeb != "")
            {
                string pathValue = pathWeb + _tempFolder;
                var path = pathValue + fileName;
                File.Delete(path);
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
