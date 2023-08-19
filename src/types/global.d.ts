export {};

declare global {
    /**
     * Now declare things that go in the global namespace,
     * or augment existing declarations in the global namespace.
     */
    interface Employee {
        id: number;
        name: string;
        salary: number;
    }

    type Course = {
       id: string,
        classroom_id: string,
        instructor_info: {username: string, email: string}
        class_name: string,
        section: string,
        allow_students_to_announcements: number,
        allow_students_to_comment: number,
        img_path: string
    };
}