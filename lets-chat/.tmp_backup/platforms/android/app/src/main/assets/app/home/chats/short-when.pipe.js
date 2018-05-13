"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var date_fns_1 = require("date-fns");
var date_fns_2 = require("date-fns");
var isToday = require("date-fns/is_today");
var isYesterday = require("date-fns/is_yesterday");
var parse = require("date-fns/parse");
var platform_1 = require("platform");
var index_1 = require("../../core/index");
var ShortWhenPipe = (function () {
    function ShortWhenPipe() {
    }
    ShortWhenPipe.prototype.transform = function (value) {
        var language = platform_1.device.language;
        if (platform_1.device.region) {
            language += "-" + platform_1.device.region;
        }
        var datePipe = new common_1.DatePipe(language);
        var parsedDate = parse(value);
        parsedDate = date_fns_2.subHours(parsedDate, 5);
        parsedDate = date_fns_1.subMinutes(parsedDate, 30);
        var defaultDate = Date.now();
        if (isToday(parsedDate)) {
            return datePipe.transform(parsedDate, 'shortTime');
        }
        if (isYesterday(parsedDate)) {
            return 'yesterday';
        }
        // default date year
        if (parsedDate.getFullYear() === index_1.Config.defaultYear) {
            return '';
        }
        return datePipe.transform(parsedDate, 'dd/MM/yy');
    };
    ShortWhenPipe = __decorate([
        core_1.Pipe({
            name: 'shortWhen',
            pure: true,
        })
    ], ShortWhenPipe);
    return ShortWhenPipe;
}());
exports.ShortWhenPipe = ShortWhenPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnQtd2hlbi5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2hvcnQtd2hlbi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMENBQTJDO0FBQzNDLHNDQUFvRDtBQUNwRCxxQ0FBc0M7QUFDdEMscUNBQW9DO0FBQ3BDLDJDQUE2QztBQUM3QyxtREFBcUQ7QUFDckQsc0NBQXdDO0FBQ3hDLHFDQUFrQztBQUNsQywwQ0FBMEM7QUFNMUM7SUFBQTtJQXlCQSxDQUFDO0lBdkJDLGlDQUFTLEdBQVQsVUFBVSxLQUE2QjtRQUNyQyxJQUFJLFFBQVEsR0FBRyxpQkFBTSxDQUFDLFFBQVEsQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxpQkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEIsUUFBUSxJQUFJLE1BQUksaUJBQU0sQ0FBQyxNQUFRLENBQUM7UUFDbEMsQ0FBQztRQUNELElBQU0sUUFBUSxHQUFHLElBQUksaUJBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUIsVUFBVSxHQUFHLG1CQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLFVBQVUsR0FBRyxxQkFBVSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4QyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDL0IsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNyQixDQUFDO1FBQ0Qsb0JBQW9CO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxjQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ1osQ0FBQztRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBeEJVLGFBQWE7UUFKekIsV0FBSSxDQUFDO1lBQ0osSUFBSSxFQUFFLFdBQVc7WUFDakIsSUFBSSxFQUFFLElBQUk7U0FDWCxDQUFDO09BQ1csYUFBYSxDQXlCekI7SUFBRCxvQkFBQztDQUFBLEFBekJELElBeUJDO0FBekJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0ZVBpcGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc3ViTWludXRlcyB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IHN1YkhvdXJzIH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0ICogYXMgaXNUb2RheSBmcm9tICdkYXRlLWZucy9pc190b2RheSc7XG5pbXBvcnQgKiBhcyBpc1llc3RlcmRheSBmcm9tICdkYXRlLWZucy9pc195ZXN0ZXJkYXknO1xuaW1wb3J0ICogYXMgcGFyc2UgZnJvbSAnZGF0ZS1mbnMvcGFyc2UnO1xuaW1wb3J0IHsgZGV2aWNlIH0gZnJvbSAncGxhdGZvcm0nO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29yZS9pbmRleCc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3Nob3J0V2hlbicsXG4gIHB1cmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIFNob3J0V2hlblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICB0cmFuc2Zvcm0odmFsdWU6IG51bWJlciB8IHN0cmluZyB8IERhdGUpOiBzdHJpbmcge1xuICAgIGxldCBsYW5ndWFnZSA9IGRldmljZS5sYW5ndWFnZTtcbiAgICBpZiAoZGV2aWNlLnJlZ2lvbikge1xuICAgICAgbGFuZ3VhZ2UgKz0gYC0ke2RldmljZS5yZWdpb259YDtcbiAgICB9XG4gICAgY29uc3QgZGF0ZVBpcGUgPSBuZXcgRGF0ZVBpcGUobGFuZ3VhZ2UpO1xuICAgIGxldCBwYXJzZWREYXRlID0gcGFyc2UodmFsdWUpO1xuICAgIHBhcnNlZERhdGUgPSBzdWJIb3VycyhwYXJzZWREYXRlLCA1KTtcbiAgICBwYXJzZWREYXRlID0gc3ViTWludXRlcyhwYXJzZWREYXRlLCAzMCk7XG4gICAgY29uc3QgZGVmYXVsdERhdGUgPSBEYXRlLm5vdygpO1xuICAgIGlmIChpc1RvZGF5KHBhcnNlZERhdGUpKSB7XG4gICAgICByZXR1cm4gZGF0ZVBpcGUudHJhbnNmb3JtKHBhcnNlZERhdGUsICdzaG9ydFRpbWUnKTtcbiAgICB9XG5cbiAgICBpZiAoaXNZZXN0ZXJkYXkocGFyc2VkRGF0ZSkpIHtcbiAgICAgIHJldHVybiAneWVzdGVyZGF5JztcbiAgICB9XG4gICAgLy8gZGVmYXVsdCBkYXRlIHllYXJcbiAgICBpZiAocGFyc2VkRGF0ZS5nZXRGdWxsWWVhcigpID09PSBDb25maWcuZGVmYXVsdFllYXIpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gICAgcmV0dXJuIGRhdGVQaXBlLnRyYW5zZm9ybShwYXJzZWREYXRlLCAnZGQvTU0veXknKTtcbiAgfVxufVxuIl19