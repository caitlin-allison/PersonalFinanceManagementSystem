#include <string>
#include <optional>
#include <ctime>

using namespace std;

class Goal {
public:
    Goal(int id, int userId, string name, double amount,
         bool hasDeadline, optional<tm> deadlineDate,
         string description, string category)
        : id(id), userId(userId), name(name), amount(amount),
          hasDeadline(hasDeadline), deadlineDate(deadlineDate),
          description(description), category(category) {}

    int getId() const {
        return id;
    }

    int getUserId() const {
        return userId;
    }

    string getName() const {
        return name;
    }

    double getAmount() const {
        return amount;
    }

    bool getHasDeadline() const {
        return hasDeadline;
    }

    optional<tm> getDeadlineDate() const {
        return deadlineDate;
    }

    string getDescription() const {
        return description;
    }

    string getCategory() const {
        return category;
    }

    void setId(int id) {
        this->id = id;
    }

    void setUserId(int userId) {
        this->userId = userId;
    }

    void setName(const string& name) {
        this->name = name;
    }

    void setAmount(double amount) {
        this->amount = amount;
    }

    void setHasDeadline(bool hasDeadline) {
        this->hasDeadline = hasDeadline;
    }

    void setDeadlineDate(optional<tm> deadlineDate) {
        this->deadlineDate = deadlineDate;
    }

    void setDescription(const string& description) {
        this->description = description;
    }

    void setCategory(const string& category) {
        this->category = category;
    }

private:
    int id;
    int userId;
    string name;
    double amount;
    bool hasDeadline;
    optional<tm> deadlineDate;
    string description;
    string category;
};

// Extern "C" interface for use in WebAssembly
extern "C" {

    Goal* Goal_new(int id, int userId, const char* name, double amount,
                   bool hasDeadline, tm* deadlineDatePtr,
                   const char* description, const char* category) {
        optional<tm> deadlineDate = deadlineDatePtr ? optional<tm>(*deadlineDatePtr) : nullopt;
        return new Goal(id, userId, string(name), amount, hasDeadline,
                        deadlineDate, string(description), string(category));
    }

    void Goal_delete(Goal* instance) {
        delete instance;
    }

    int Goal_getId(Goal* instance) {
        return instance->getId();
    }

    int Goal_getUserId(Goal* instance) {
        return instance->getUserId();
    }

    const char* Goal_getName(Goal* instance) {
        return instance->getName().c_str();
    }

    double Goal_getAmount(Goal* instance) {
        return instance->getAmount();
    }

    bool Goal_getHasDeadline(Goal* instance) {
        return instance->getHasDeadline();
    }

    tm* Goal_getDeadlineDate(Goal* instance) {
        if (instance->getDeadlineDate()) {
            return new tm(instance->getDeadlineDate().value());
        }
        return nullptr;
    }

    const char* Goal_getDescription(Goal* instance) {
        return instance->getDescription().c_str();
    }

    const char* Goal_getCategory(Goal* instance) {
        return instance->getCategory().c_str();
    }

    void Goal_setId(Goal* instance, int id) {
        instance->setId(id);
    }

    void Goal_setUserId(Goal* instance, int userId) {
        instance->setUserId(userId);
    }

    void Goal_setName(Goal* instance, const char* name) {
        instance->setName(string(name));
    }

    void Goal_setAmount(Goal* instance, double amount) {
        instance->setAmount(amount);
    }

    void Goal_setHasDeadline(Goal* instance, bool hasDeadline) {
        instance->setHasDeadline(hasDeadline);
    }

    void Goal_setDeadlineDate(Goal* instance, tm* deadlineDatePtr) {
        optional<tm> deadlineDate = deadlineDatePtr ? optional<tm>(*deadlineDatePtr) : nullopt;
        instance->setDeadlineDate(deadlineDate);
    }

    void Goal_setDescription(Goal* instance, const char* description) {
        instance->setDescription(string(description));
    }

    void Goal_setCategory(Goal* instance, const char* category) {
        instance->setCategory(string(category));
    }
}
