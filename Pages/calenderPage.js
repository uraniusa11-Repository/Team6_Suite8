import { expect } from '@playwright/test';
export class CalendarPage {

    constructor(page) {

    this.page = page;

    // Calendar Menu
//this.calendarMenu = page.locator('a.top-nav-link.nav-link-nongrouped',{ hasText: 'Calendar' });
this.calendarMenu = page.locator('a.top-nav-link').filter({ hasText: 'Calendar' });
//Schedule Meeting
this.scheduleMeetingLink = page.getByRole('link', {name: 'Schedule Meeting'});
this.frame = page.locator('iframe').contentFrame();
this.meetingsHeading = this.frame.getByText('Meetings');
//schedule meeting form fill locators
 this.subjectTextbox = this.frame.locator('#name');
 this.startDateIcon = this.frame.locator('#date_start_trigger');
 this.startHourDropdown = this.frame.locator('#date_start_hours');
 this.startMinuteDropdown = this.frame.locator('#date_start_minutes');
 this.endDateIcon = this.frame.locator('#date_end_trigger');
 this.endHourDropdown = this.frame.locator('#date_end_hours');
 this.endMinuteDropdown = this.frame.locator('#date_end_minutes');
 this.statusDropdown = this.frame.locator('#status');
 this.saveButton = this.frame.getByRole('button', {name: 'Save',exact: true});
 this.createdMeetingHeading = this.frame.getByRole('heading', { name: 'accounts' })

// Created Meeting Name
  this.createdMeetingTitle = page.locator('h2.module-title-text');

//Schedule call
  this.scheduleCallLink = page.getByRole('link',{name:'Schedule Call'});
  this.createTaskLink = page.getByRole('link',{name:'Create Task'});
  this.todayLink = page.getByRole('link',{name:'Today'});

  // Call Page
  this.callHeading = this.frame.locator('.header-module-title');
  this.callsubjectTextbox = this.frame.locator('#name');
  this.callstartHourDropdown = this.frame.locator('#date_start_hours');
  this.callstartMinuteDropdown = this.frame.locator('#date_start_minutes');
  this.calldurationHoursTextbox = this.frame.locator('#duration_hours');
  this.calldirectionDropdown = this.frame.locator('#direction');
  this.callstatusDropdown = this.frame.locator('#status');
  this.callsaveButton = this.frame.getByRole('button',{name:'Save',exact:true});
//  this.createdCallHeading = this.frame.getByRole('heading',{name:'Accounts'});
this.createdCallHeading =
    page.locator('h2.module-title-text');
  
// Task
  this.createTaskLink = page.getByRole('link', {name: 'Create Task'});

  // Task Page Heading
    this.taskHeading = page.getByText('Create', { exact: true });
    this.taskSubjectTextbox =  this.page.getByRole('tabpanel', { name: 'TASK OVERVIEW' }).locator('input[type="text"]');
   
  // Start Date Calendar
    this.taskStartDateButton = page.getByRole('button').nth(3);

// Due Date Calendar
    this.taskDueDateButton = page.locator(
        '.dynamic-field.dynamic-field-mode-edit.dynamic-field-name-date_due > .d-flex > .flex-grow-1 > .input-group > .input-group-append > scrm-button > .btn'
    );

// Priority
this.priorityDropdown = page.locator('scrm-dropdownenum-edit').filter({ hasText: 'High Medium Low' })
        .locator('select');

// Status
this.taskStatusDropdown = page.locator('scrm-dropdownenum-edit').filter({ hasText: 'Not Started In Progress' })
        .getByRole('combobox');

// Created Task
  this.createdTaskHeading = page.locator('.dynamic-label').first();
  this.priorityDropdown = this.page.locator('scrm-dropdownenum-edit').filter({hasText:'High Medium Low'}).locator('select');
  this.taskStatusDropdown = this.page.locator('scrm-dropdownenum-edit').filter({hasText:'Not Started In Progress'}).locator('select');
  this.taskSaveButton = this.page.getByRole('button',{name:'Save'});
  this.createdTaskHeading = this.page.locator('.record-view-name-label');
  
  // Calendar
  this.calendarHeading = this.frame.getByRole('heading',{name:'Calendar'});
}
 

//Methods
//Schedule meeting methods

   async navigateToScheduleMeeting() {

    await this.calendarMenu.hover();
    await this.scheduleMeetingLink.waitFor({state: 'visible'});
    await this.scheduleMeetingLink.click();
    await this.page.waitForTimeout(3000);
   
}

async verifyMeetingPage() {
      await this.page.waitForLoadState('networkidle');
    await expect(this.meetingsHeading).toContainText('Meetings');
    const text = await this.meetingsHeading.textContent();
  
}

getStartDate(day) {
    return this.frame.getByRole('link', {name: String(day),exact: true});
}
getEndDate(day) {
    return this.frame.getByRole('cell', {name: String(day),exact: true});
}

async createMeeting(data) {

    await this.subjectTextbox.fill(data.subject);
    await this.startDateIcon.click();
    await this.getStartDate(data.startDate).click();
    await this.startHourDropdown.selectOption(data.startHour);
    await this.startMinuteDropdown.selectOption(data.startMinute);
    await this.endDateIcon.click();
    await this.getEndDate(data.endDate).click();
    await this.endHourDropdown.selectOption(data.endHour);
    await this.endMinuteDropdown.selectOption(data.endMinute);
    await this.statusDropdown.selectOption(data.status);

}
async clickSaveButton() {

    await this.saveButton.click();
}

async verifyCreatedMeeting(expectedSubject) {

    const meetingHeading = this.frame.getByRole('heading', {name: expectedSubject });
    await expect(meetingHeading).toBeVisible();
    const text = await meetingHeading.textContent();
  
    }

   //Navigation Methods
    async navigateToScheduleCall() {

        await this.calendarMenu.hover();
        await this.scheduleCallLink.click();
    }

    async navigateToCreateTask() {

        await this.calendarMenu.hover();
        await this.createTaskLink.waitFor({state: 'visible'});
        await this.createTaskLink.click();
    }

    async navigateToToday() {

        await this.calendarMenu.hover();
        await this.todayLink.click();
    }

   
    // Verification Methods


    async verifyCallPage() {

        await expect(this.callHeading).toContainText('Calls');
    }

    async verifyTaskPage() {

        await expect(this.taskHeading).toContainText('Create');
    }

    async verifyCalendarPage() {

        
        await expect(this.calendarHeading).toContainText('Calendar');
    }

   
    // Create Call
  

    async createCall(data) {

        await this.callsubjectTextbox.fill(data.subject);
        await this.callstartHourDropdown.selectOption(data.startHour);
        await this.callstartMinuteDropdown.selectOption(data.startMinute);
        await this.calldurationHoursTextbox.fill(data.durationHours);
        await this.calldirectionDropdown.selectOption(data.direction);
        await this.callstatusDropdown.selectOption(data.status);
        await this.callsaveButton.click();
    }

    async verifyCreatedCall(subject) {

           const callHeadingNavText = this.frame.getByRole('heading').first();
           await expect(callHeadingNavText).toContainText(subject);
       
    }

  
    // Create Task
   
getTaskStartDate(day) {

    return this.page.getByText(String(day),{ exact: true }).first();
}

getTaskDueDate(day) {

    return this.page.getByText(String(day),{ exact: true }).first();
}
    async createTask(data) {

        await this.taskSubjectTextbox.fill(data.subject);
        await this.taskStartDateButton.click();
        await this.getTaskStartDate(data.startDate).click();
        await this.taskDueDateButton.click();
        await this.getTaskDueDate(data.dueDate).click();
        await this.priorityDropdown.selectOption(data.priority);
        await this.taskStatusDropdown.selectOption(data.status);
        await this.taskSaveButton.click();
    }

    async verifyCreatedTask(subject) {

        await expect(this.createdTaskHeading).toContainText(subject);
        const text = await this.createdTaskHeading.textContent();
      
    }
}

