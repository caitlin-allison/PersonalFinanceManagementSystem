#include <string>
#include <optional>
#include <ctime>

using namespace std;

class Income {
public:
    // Constructor
    Income(int id, int userId, double amount, bool isMonthly,
           optional<tm> payDate, string category, string description, string name)
        : id(id), userId(userId), amount(amount), isMonthly(isMonthly),
          payDate(payDate), category(category), description(description), name(name) {}

    // Getters
    int getId() const {
        return id;
    }

    int getUserId() const {
        return userId;
    }

    double getAmount() const {
        return amount;
    }

    bool getIsMonthly() const {
        return isMonthly;
    }

    optional<tm> getPayDate() const {
        return payDate;
    }

    string getCategory() const {
        return category;
    }

    string getDescription() const {
        return description;
    }

    string getName() const {
        return name;
    }

    // Setters
    void setId(int id) {
        this->id = id;
    }

    void setUserId(int userId) {
        this->userId = userId;
    }

    void setAmount(double amount) {
        this->amount = amount;
    }

    void setIsMonthly(bool isMonthly) {
        this->isMonthly = isMonthly;
    }

    void setPayDate(optional<tm> payDate) {
        this->payDate = payDate;
    }

    void setCategory(const string& category) {
        this->category = category;
    }

    void setDescription(const string& description) {
        this->description = description;
    }

    void setName(const string& name) {
        this->name = name;
    }

private:
    int id;
    int userId;
    double amount;
    bool isMonthly;
    optional<tm> payDate;
    string category;
    string description;
    string name;
};

// Extern "C" interface for Emscripten
extern "C" {
    Income* Income_new(int id, int userId, double amount, bool isMonthly,
                       tm* payDatePtr, const char* category, const char* description, const char* name) {
        optional<tm> payDate = payDatePtr ? optional<tm>(*payDatePtr) : nullopt;
        return new Income(id, userId, amount, isMonthly, payDate, category, description, name);
    }

    void Income_delete(Income* instance) {
        delete instance;
    }

    int Income_getId(Income* instance) {
        return instance->getId();
    }

    int Income_getUserId(Income* instance) {
        return instance->getUserId();
    }

    double Income_getAmount(Income* instance) {
        return instance->getAmount();
    }

    bool Income_getIsMonthly(Income* instance) {
        return instance->getIsMonthly();
    }

    tm* Income_getPayDate(Income* instance) {
        if (instance->getPayDate()) {
            return new tm(instance->getPayDate().value());
        }
        return nullptr;
    }

    const char* Income_getCategory(Income* instance) {
        return instance->getCategory().c_str();
    }

    const char* Income_getDescription(Income* instance) {
        return instance->getDescription().c_str();
    }

    const char* Income_getName(Income* instance) {
        return instance->getName().c_str();
    }

    void Income_setId(Income* instance, int id) {
        instance->setId(id);
    }

    void Income_setUserId(Income* instance, int userId) {
        instance->setUserId(userId);
    }

    void Income_setAmount(Income* instance, double amount) {
        instance->setAmount(amount);
    }

    void Income_setIsMonthly(Income* instance, bool isMonthly) {
        instance->setIsMonthly(isMonthly);
    }

    void Income_setPayDate(Income* instance, tm* payDatePtr) {
        optional<tm> payDate = payDatePtr ? optional<tm>(*payDatePtr) : nullopt;
        instance->setPayDate(payDate);
    }

    void Income_setCategory(Income* instance, const char* category) {
        instance->setCategory(category);
    }

    void Income_setDescription(Income* instance, const char* description) {
        instance->setDescription(description);
    }

    void Income_setName(Income* instance, const char* name) {
        instance->setName(name);
    }
}